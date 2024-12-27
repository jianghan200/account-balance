package com.hsbc.account.service;


import com.hsbc.account.config.RedisConfig;
import com.hsbc.account.repo.Transfer;
import com.hsbc.account.repo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.TransientDataAccessException;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import javax.persistence.EntityNotFoundException;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Validated
@Slf4j
public class AccountBalanceService {


    private final AccountBalanceRepo accountBalanceRepo;
    private final TransferLogRepo transferLogRepo;
    private final RedisOperations<String, String> redisOperations;
    private final ApplicationEventPublisher eventPublisher;
    private final Duration lockTimeout;

    private final ConcurrentHashMap<Long, Long> inMemoryBalances = new ConcurrentHashMap<>();

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public AccountBalanceService(AccountBalanceRepo balanceRepo, TransferLogRepo transactionLogRepo,
                                 RedisOperations<String, String> redisOperations,
                                 ApplicationEventPublisher eventPublisher,
                                 @Value("${service.lock.timeout}") Duration lockTimeout) {
        this.accountBalanceRepo = balanceRepo;
        this.transferLogRepo = transactionLogRepo;
        this.redisOperations = redisOperations;
        this.eventPublisher = eventPublisher;
        this.lockTimeout = lockTimeout;
    }


//    @Cacheable(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#accountId")
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public AccountBalance queryAccountBalance(String accountId) {
        AccountBalance accountBalance = accountBalanceRepo.findById(Long.parseLong(accountId)).orElseThrow(() ->
                new EntityNotFoundException("Can't find account " + accountId));
        return accountBalance;
    }


    /**
     * 我们这里假设的是一个高并发的余额更新场景，这里实现的为悲观锁机制，在高并发更新的场景下不适合使用乐观锁，反而会增加数据库负担
     * 可以通过维护用户是否是高频更新用户来决定是否使用悲观锁
     * 此函数执行扣减动作，如为收款，amount 为负数
     * @param transactionId
     * @param userId
     * @param amount
     * @param isPay
     * @return
     */
    @Caching(evict = {
            @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#userId")
    })
    @Retryable
    @Transactional(rollbackFor = Exception.class)
    public UpdateBalanceStatus updateBalancePessimistic(String transactionId, Long accountId, Long amount, boolean isPay) {
        // 获取DataSource
        DataSource dataSource = jdbcTemplate.getDataSource();

        // 获取Connection
        try (Connection connection = DataSourceUtils.getConnection(dataSource)) {
            // 创建Statement
            Statement statement = connection.createStatement();

            // 悲观锁 + 批量执行（减少一次与 MySQL 的交互）, 扣款的时候需要检测余额是否充足
            String sql = "SELECT * FROM account_balance WHERE account_id = " + accountId + " FOR UPDATE ;\n"+
                    "UPDATE account_balance SET balance = balance - " + amount + " WHERE account_id = " + accountId + " and balance > " + amount +";";
            // 这里也可以再增加一个支付状态的更新，从而处理极端情况

            // 执行SQL
            boolean result = statement.execute(sql);

            // 第一个 result 表示 select 语句的结果，期望为 true
            if (result) {
                result = statement.getMoreResults();
                // 第二个 result 表示 update 语句的结果，期望为 false
                if(!result){
                    // 获取更新计数，成功更新一行
                    if(statement.getUpdateCount() == 1){
                        log.info("transactionId " + transactionId + (isPay?" Paid":" Received"));
                        return UpdateBalanceStatus.SUCCEED;
                    } else if(statement.getUpdateCount() == 0){
                        return UpdateBalanceStatus.NO_ENOUGH_MONEY;
                    }
                }
            }
            // 清理资源
            statement.close();
            return UpdateBalanceStatus.FAILED;
        } catch (Exception e) {
            if(e instanceof SQLException){
                // 异常处理
                e.printStackTrace();
                return UpdateBalanceStatus.FAILED;
            }
        }
        return UpdateBalanceStatus.FAILED;
    }

    /**
     * 处理转账逻辑
     * @param transfer
     */
    public TransferStatus persistAndExecute(Transfer transfer) {
        String transactionId = transfer.getTransactionId();
        try {
            // 交易记录，这里保证了交易不会被重复处理
            transferLogRepo.save(transfer);

            // 转账和收款分开，在分布式场景下可以更好扩展，可以使用 hash 将统一用户的余额更新的请求通过消息队列分发到特定的机器上
            // 这里，我们扣减成功了才执行加余额，如果出现了减少余额却没有增加余额，可以将消息更新
            // 如果是低频更新账户，可以区别对待采用乐观锁，我们这里只实现高频账户更新的悲观锁
            UpdateBalanceStatus status = updateBalancePessimistic(transfer.getTransactionId(), transfer.getFromAccountId(), transfer.getAmount(), true);
            if(status == UpdateBalanceStatus.SUCCEED){
                // 处理成功之后可以通过消息队列发一个消息
                // 扣钱失败就不用转钱了
                updateBalancePessimistic(transfer.getTransactionId(), transfer.getToAccountId(), -transfer.getAmount(), false);
                return TransferStatus.COMPLETED;
            }else if( status == UpdateBalanceStatus.NO_ENOUGH_MONEY ){
                return TransferStatus.NO_ENOUGH_MONEY;
            }
            // 扣减失败，更新数据库, 或加入异步任务
            return TransferStatus.FAILED;
        } catch (PersistenceException ex) {
            String message = ex.getMessage() != null ? ex.getMessage() : "";
            // 将处理失败消息异步发送出去
            transfer.setStatus(TransferStatus.FAILED.name());
            transferLogRepo.save(transfer);
//            eventPublisher.publishEvent(transfer);
            throw ex;
        }
    }


    /**
     * 用乐观锁的方式实现余额更新
     * @param amount
     */
    @Caching(evict = {
            @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#userId")
    })
    @Lock(LockModeType.OPTIMISTIC)
    @Retryable(include = {TransientDataAccessException.class, TransactionException.class})
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void updateBalanceOptimistic(AccountBalance accountBalance, Long amount) {
        accountBalance.setBalance(accountBalance.getBalance() - amount);
        accountBalanceRepo.save(accountBalance);
    }

    @Lock(LockModeType.OPTIMISTIC)
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AccountBalance withdrawAccount(Long accountId, Long amount, UUID requestId) {
        return processWithLock("request-lock:" + requestId, () -> {
            AccountBalance accountBalance = accountBalanceRepo.findById(accountId)
                    .orElseThrow(() -> new EntityNotFoundException("Can't find account " + accountId));
            accountBalance.setBalance(accountBalance.getBalance() - amount);
            return accountBalanceRepo.save(accountBalance);
        });
    }

    @Lock(LockModeType.OPTIMISTIC)
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AccountBalance depositAccount(Long accountId, Long amount, UUID requestId) {
        return processWithLock("request-lock:" + requestId, () -> {
            AccountBalance accountBalance = accountBalanceRepo.findById(accountId)
                    .orElseThrow(() -> new EntityNotFoundException("Can't find account " + accountId));
            accountBalance.setBalance(accountBalance.getBalance() + amount);
            return accountBalanceRepo.save(accountBalance);
        });
    }

    /**
     * 使用 Redis 实现分布式锁
     * @param lockKey
     * @param action
     * @return
     * @param <T>
     */
    private <T> T processWithLock(String lockKey, java.util.function.Supplier<T> action) {
        boolean isLocked = redisOperations.opsForValue().setIfAbsent(lockKey, "locked", lockTimeout);
        if (isLocked) {
            try {
                return action.get();
            } finally {
                redisOperations.opsForValue().getAndDelete(lockKey);
            }
        } else {
            throw new ConcurrentModificationException("LockKey " + lockKey + " is already being processed");
        }
    }




}
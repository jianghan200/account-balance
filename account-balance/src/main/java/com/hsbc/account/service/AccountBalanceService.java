package com.hsbc.account.service;

import com.hsbc.account.config.RedisConfig;
import com.hsbc.account.repo.*;
import com.hsbc.commonlib.client.TransactionClient;
import com.hsbc.commonlib.bean.TransferStatus;
import com.hsbc.commonlib.bean.UpdateBalanceStatus;
import com.hsbc.account.repo.AccountBalance;
import com.hsbc.account.repo.Transfer;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.scheduling.annotation.Scheduled;
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

    private JdbcTemplate jdbcTemplate;

    public AccountBalanceService(AccountBalanceRepo balanceRepo, TransferLogRepo transactionLogRepo,
                                 RedisOperations<String, String> redisOperations,
                                 ApplicationEventPublisher eventPublisher,
                                 JdbcTemplate jdbcTemplate,
                                 @Value("${service.lock.timeout}") Duration lockTimeout) {
        this.accountBalanceRepo = balanceRepo;
        this.transferLogRepo = transactionLogRepo;
        this.redisOperations = redisOperations;
        this.eventPublisher = eventPublisher;
        this.lockTimeout = lockTimeout;
        this.jdbcTemplate = jdbcTemplate;
    }


    @Cacheable(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#accountId")
    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public AccountBalance queryAccountBalance(Long accountId) {
        AccountBalance accountBalance = accountBalanceRepo.findById(accountId).orElseThrow(() ->
                new EntityNotFoundException("Can't find account " + accountId));
        return accountBalance;
    }


    /**
     * 我们这里假设的是一个高并发的余额更新场景，这里实现的为悲观锁机制，在高并发更新的场景下不适合使用乐观锁，反而会增加数据库负担
     * 可以通过维护用户是否是高频更新用户来决定是否使用悲观锁
     * 此函数执行扣减动作，如为收款，amount 为负数
     * @param transactionId
     * @param accountId
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
            String sql = new StringBuilder("SELECT * FROM account_balance WHERE account_id = ").append(accountId).append(" FOR UPDATE ;\n")
                    .append("UPDATE account_balance SET balance = balance - ").append(amount).append(" WHERE account_id = " )
                    .append(accountId).append(" and balance > ").append(amount).append(";")
                    .toString();
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
                        return UpdateBalanceStatus.INSUFFICIENT_FUNDS;
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
    @Caching(evict = {
            @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#transfer.fromAccountId"),
            @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#transfer.toAccountId")
    })
    public TransferStatus persistAndExecuteByRedisLock(Transfer transfer) {
        try {
            // 交易记录，这里保证了交易不会被重复处理
            transferLogRepo.save(transfer);
            AccountBalance accountBalance = updateBalanceByRedisLock(transfer, true);
            if(accountBalance!=null) {
                // 支付成功才收款
                updateBalanceByRedisLock(transfer, false);
            }
            return TransferStatus.COMPLETED;
        } catch (Exception ex) {
            String message = ex.getMessage() != null ? ex.getMessage() : "";
            log.error(transfer.getTransactionId() + " " + message);
            // 将处理失败消息异步发送出去
            transfer.setStatus(TransferStatus.FAILED.name());
            transferLogRepo.save(transfer);
            return TransferStatus.FAILED;
        }
    }

    public TransferStatus receivedByRedisLock(Transfer transfer) {
        try {
            // 交易记录，这里保证了交易不会被重复处理
            updateBalanceByRedisLock(transfer, false);
            return TransferStatus.COMPLETED;
        } catch (Exception ex) {
            String message = ex.getMessage() != null ? ex.getMessage() : "";
            log.error(transfer.getTransactionId() + " " + message);
            // 将处理失败消息异步发送出去
            transfer.setStatus(TransferStatus.RECEIVED_FAILED.name());
            transferLogRepo.save(transfer);
            return TransferStatus.RECEIVED_FAILED;
        }
    }

    @Retryable
    @Transactional
    public AccountBalance updateBalanceByRedisLock(Transfer transfer, boolean isPay) {
        Long accountId = isPay ? transfer.getFromAccountId() : transfer.getToAccountId();

        return processWithLock("request-lock:" + accountId, () -> {

            AccountBalance accountBalance = accountBalanceRepo.findById(accountId)
                    .orElseThrow(() -> new EntityNotFoundException("Can't find account " + accountId));

            if(isPay && transfer.getAmount() > accountBalance.getBalance()) {
                transfer.setStatus(TransferStatus.INSUFFICIENT_FUNDS.name());
                transferLogRepo.save(transfer);
                return accountBalance;
            }

            if(isPay){
                accountBalance.setBalance(accountBalance.getBalance() - transfer.getAmount());
            }else{
                accountBalance.setBalance(accountBalance.getBalance() + transfer.getAmount());
            }

            accountBalance = accountBalanceRepo.save(accountBalance);
            if(accountBalance != null){
                if(isPay ){
                    transfer.setPayStatus(TransferStatus.PAID.name());
                    transfer.setPayTime(new Date());
//                    transfer.setStatus(TransferStatus.PAID.name());
//                    transfer.setUpdate_time(new Date());
                    transferLogRepo.save(transfer);
                }else{
                    transfer.setReceiveStatus(TransferStatus.RECEIVED.name());
                    transfer.setReceiveTime(new Date());
//                    transfer.setStatus(TransferStatus.COMPLETED.name());
//                    transfer.setUpdate_time(new Date());
                    transferLogRepo.save(transfer);
                }
            }
            return accountBalance;
        });
    }


    /**
     * 处理转账逻辑
     * @param transfer
     */
    @Caching(evict = {
            @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#transfer.fromAccountId"),
            @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#transfer.toAccountId")
    })
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
            }else if( status == UpdateBalanceStatus.INSUFFICIENT_FUNDS){
                return TransferStatus.INSUFFICIENT_FUNDS;
            }
            // 扣减失败，更新数据库, 或加入异步任务
            return TransferStatus.FAILED;
        } catch (PersistenceException ex) {
            String message = ex.getMessage() != null ? ex.getMessage() : "";
            // 将处理失败消息异步发送出去
            transfer.setStatus(TransferStatus.FAILED.name());
            transfer.setUpdate_time(new Date());
            transferLogRepo.save(transfer);
//            eventPublisher.publishEvent(transfer);
            throw ex;
        }
    }


    /**
     * 用乐观锁的方式实现余额更新
     * @param amount
     */
    @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#accountBalance.accountId")
    @Lock(LockModeType.OPTIMISTIC)
    @Retryable(include = {TransientDataAccessException.class, TransactionException.class})
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void updateBalanceOptimistic(AccountBalance accountBalance, Long amount) {
        accountBalance.setBalance(accountBalance.getBalance() - amount);
        accountBalanceRepo.save(accountBalance);
    }


    @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#accountId")
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


    @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#accountId")
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


    /** This is to set the account balance
     * for Integration test purpose
     * @param accountId
     * @param balance
     * @param requestId
     * @return
     */
    @CacheEvict(value = RedisConfig.ACCOUNT_BALANCE_CACHE, key = "#accountId")
    @Lock(LockModeType.OPTIMISTIC)
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AccountBalance setAccountBalance(Long accountId, Long balance, UUID requestId) {
        return processWithLock("request-lock:" + requestId, () -> {
            AccountBalance accountBalance = accountBalanceRepo.findById(accountId)
                    .orElseThrow(() -> new EntityNotFoundException("Can't find account " + accountId));
            accountBalance.setBalance(balance);
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


    /**
     * 使用分布式锁，锁竞争很激烈，测试中 40000 条转账有 4012 条获取锁失败，所以必须通过定时任务来筛选没有完成的转账
     * 悲观锁场景其实也需要数据库记录转账状态，我们测试中悲观锁的锁竞争被数据库处理，测试样例中没有执行失败的情况，生产环境我们一样需要数据库来记录转账状态
     * 获取所有创建时间超过 1 秒且 pay_status 为 PENDING 的 Transfer 条目
     * 每 500 毫秒执行一次的方法
     * 这里使用 Scheduled 是单线程顺序执行的，要提高性能可以使用多线程的形式优化，但是处理条目要注意状态更新和加锁防止重复处理
     */
    @Scheduled(fixedRate = 500)
    public void processPendingTransfers() {
        Date oneSecondAgo = new Date(System.currentTimeMillis() - 1000); // 获取一秒之前的时间
        // 获取所有pay_status为PENDING的Transfer条目
        List<Transfer> pendingTransfers = transferLogRepo.findByPayStatusAndCreateTimeBefore(oneSecondAgo);
        if(pendingTransfers.size() >0){
            log.info("processPendingTransfers " + pendingTransfers.size() + " items found");
        }

        // 逐条处理 Transfer条目
        for (Transfer transfer : pendingTransfers) {
            persistAndExecuteByRedisLock(transfer);
        }
    }

    /**
     * 获取所有付款成功（pay_status为PAID）超过 1 秒的且receive_status为PENDING的Transfer条目
     */
    @Scheduled(fixedRate = 500)
    public void processPendingReceivedTransfers() {
        Date oneSecondAgo = new Date(System.currentTimeMillis() - 1000); // 获取一秒之前的时间
        List<Transfer> paidPendingReceiveTransfers = transferLogRepo.findByPayStatusAndReceiveStatusAndPayTimeBefore(oneSecondAgo);
        if(paidPendingReceiveTransfers.size() > 0){
            log.info("processPendingReceivedTransfers " + paidPendingReceiveTransfers.size() + " items found");
        }
        // 逐条处理 Transfer条目
        for (Transfer transfer : paidPendingReceiveTransfers) {
            receivedByRedisLock(transfer);
        }
    }

}
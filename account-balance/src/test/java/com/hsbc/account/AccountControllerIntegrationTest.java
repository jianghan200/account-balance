package com.hsbc.account;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hsbc.account.repo.AccountBalanceRepo;
import com.hsbc.account.service.AccountBalanceService;
import com.hsbc.account.repo.AccountBalance;
import com.hsbc.account.repo.Transfer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.persistence.LockModeType;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Tag("integration")
@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AccountControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @Autowired
    private AccountBalanceService accountBalanceService;

    @Autowired
    private AccountBalanceRepo accountBalanceRepo;


    @BeforeEach
    public void setAccountBalance() throws Exception {
        // 将数据库的账户余额初始化
        accountBalanceService.setAccountBalance(1L, 10000L, UUID.randomUUID());
        accountBalanceService.setAccountBalance(101L, 10000L, UUID.randomUUID());
    }

    @Lock(LockModeType.OPTIMISTIC)
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public AccountBalance setAccountBalance(Long accountId, Long balance, UUID requestId) {
            AccountBalance accountBalance = accountBalanceRepo.findById(accountId)
                .orElseThrow(() -> new EntityNotFoundException("Can't find account " + accountId));
        accountBalance.setBalance(balance);
        accountBalanceRepo.save(accountBalance);
        return accountBalance;
    }

    @Test
    public void accountTranferTest() throws Exception {

        Transfer transfer = new Transfer(UUID.randomUUID().toString(), 1L, 101L, 1L);

        mockMvc.perform(MockMvcRequestBuilders.post("/account:transfer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(transfer)));

        Long accountId = 101L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountId).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10001L));

        accountId = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountId).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(9999L));

        // 再一次转账，反向转账
        Transfer transfer2 = new Transfer(UUID.randomUUID().toString(), 101L, 1L, 1L);
        mockMvc.perform(MockMvcRequestBuilders.post("/account:transfer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(transfer2)));

        accountId = 101L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountId).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L));

        accountId = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountId).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L));
    }


    @Test
    public void queryAccountBalanceTest() throws Exception {
//        Long accountA = 1L;
//        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountA))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.version").value(1));


        Long accountA = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountA))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L));

        accountA = 101L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountA))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L));
    }

    @Test
    public void transferNotEnoughMoney() throws Exception {
        Transfer transfer = new Transfer(UUID.randomUUID().toString(), 1L, 101L, 10001L);
        mockMvc.perform(MockMvcRequestBuilders.post("/account:transfer")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(transfer)));

        // Money still the same
        Long accountA = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L));
    }


        @Test
        public void updateBalanceOptimisticTest() throws Exception {
            // 测试更新余额
            accountBalanceService.updateBalanceOptimistic(accountBalanceRepo.findById(1L).orElseThrow(), 500L);
            mockMvc.perform(MockMvcRequestBuilders.get("/account/1").contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(9500L));
        }

        @Test
        public void withdrawAccountTest() throws Exception {
            // 测试取款
            AccountBalance accountBalance = accountBalanceRepo.findById(1L).orElseThrow();
            AccountBalance updatedBalance = accountBalanceService.withdrawAccount(1L, 500L, UUID.randomUUID());
            mockMvc.perform(MockMvcRequestBuilders.get("/account/1").contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(9500L));
        }

        @Test
        public void depositAccountTest() throws Exception {
            // 测试存款
            AccountBalance accountBalance = accountBalanceRepo.findById(1L).orElseThrow();
            AccountBalance updatedBalance = accountBalanceService.depositAccount(1L, 500L, UUID.randomUUID());
            mockMvc.perform(MockMvcRequestBuilders.get("/account/1").contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10500L));
        }

        @Test
        public void setAccountBalanceTest() throws Exception {
            // 测试设置账户余额
            AccountBalance updatedBalance = accountBalanceService.setAccountBalance(1L, 5000L, UUID.randomUUID());
            mockMvc.perform(MockMvcRequestBuilders.get("/account/1").contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(5000L));
        }

    @Test
    public void optimisticLockingTest() throws Exception {
        // 测试乐观锁
        AccountBalance accountBalance = accountBalanceRepo.findById(1L).orElseThrow();
        accountBalanceService.updateBalanceOptimistic(accountBalance, 500L);

        // 验证余额是否已经更新
        mockMvc.perform(MockMvcRequestBuilders.get("/account/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(9500L));

        // 模拟并发更新，导致乐观锁冲突
        AccountBalance duplicate = accountBalance.copy(); // 重新加载对象以获取旧版本
        assertThrows(OptimisticLockingFailureException.class, () -> {
            accountBalanceService.updateBalanceOptimistic(duplicate, 200L);
        }, "Expected OptimisticLockingFailureException to be thrown for the second update");

        // 验证余额没有被第二次更新影响
        mockMvc.perform(MockMvcRequestBuilders.get("/account/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(9500L));
    }


}
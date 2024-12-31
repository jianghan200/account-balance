package com.hsbc.account.service;

import com.hsbc.account.repo.*;
import com.hsbc.account.repo.AccountBalance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.persistence.EntityNotFoundException;
import java.time.Duration;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class AccountBalanceServiceTest {

    @Mock
    private AccountBalanceRepo accountBalanceRepo;

    @Mock
    private TransferLogRepo transferLogRepo;

    @Mock
    private RedisOperations<String, String> redisOperations;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private AccountBalanceService accountBalanceService;

    private final Duration lockTimeout = Duration.ofSeconds(10);

    @BeforeEach
    public void setUp() {
        accountBalanceService = new AccountBalanceService(accountBalanceRepo, transferLogRepo, redisOperations, eventPublisher, jdbcTemplate, lockTimeout);
    }


    @Test
    public void testQueryAccountBalance_ShouldReturnAccountBalance() {
        // Arrange
        Long accountId = 1L;
        AccountBalance accountBalance = new AccountBalance();
        accountBalance.setAccountId(accountId);
        when(accountBalanceRepo.findById(accountId)).thenReturn(Optional.of(accountBalance));

        // Act
        AccountBalance result = accountBalanceService.queryAccountBalance(accountId);

        // Assert
        assertNotNull(result);
        assertEquals(accountId, result.getAccountId());
    }


    @Test
    public void testQueryAccountBalance_ShouldThrowExceptionWhenAccountNotFound() {
        // Arrange
        Long accountId = 1002L;
        when(accountBalanceRepo.findById(accountId)).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(EntityNotFoundException.class, () -> accountBalanceService.queryAccountBalance(accountId));
        assertEquals("Can't find account " + accountId, exception.getMessage());
    }

}
package com.hsbc.account.controller;

import com.hsbc.commonlib.bean.TransferStatus;
import com.hsbc.account.service.AccountBalanceService;
import com.hsbc.account.repo.AccountBalance;
import com.hsbc.account.repo.Transfer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@Validated
@RestController("/v1/account")
@Slf4j
public class AccountController {

    private final AccountBalanceService accountService;

    public AccountController(AccountBalanceService accountService) {
        this.accountService = accountService;
    }

    /**
     * 查询用户余额
     * @param id 账户 ID
     * @return
     */
    @GetMapping("/account/{id}")
    public AccountBalance queryAccountBalance(@PathVariable Long id) {
        return accountService.queryAccountBalance(id);
    }

    /**
     * 执行转账操作
     * @param Transfer
     * @return
     */
    @PostMapping("/account:transfer")
    public ResponseEntity<String> transfer( @RequestBody Transfer transfer) {
        log.info(transfer.toString());
        TransferStatus status = accountService.persistAndExecute(transfer);

        if(status == TransferStatus.COMPLETED){
            return ResponseEntity.status(HttpStatus.OK).body("Transaction " + transfer.getTransactionId() +" processed successfully");
        }else if(status == TransferStatus.INSUFFICIENT_FUNDS){
            return ResponseEntity.status(HttpStatus.OK).body("Account balance not enough");
        }else {
            return ResponseEntity.status(HttpStatus.OK).body("Failed to process");
        }
    }

    @PostMapping("/account:transferWithRedisLock")
    public ResponseEntity<String> transferWithRedisLock( @RequestBody Transfer transfer) {
        log.info(transfer.toString());
        TransferStatus status = accountService.persistAndExecuteByRedisLock(transfer);
        return ResponseEntity.status(HttpStatus.OK).body("Transaction " + transfer.getTransactionId() +" processed successfully");
    }

}
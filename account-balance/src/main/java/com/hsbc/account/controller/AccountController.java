package com.hsbc.account.controller;

import com.hsbc.account.repo.AccountBalance;
import com.hsbc.account.repo.Transfer;
import com.hsbc.account.repo.TransferStatus;
import com.hsbc.account.service.AccountBalanceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController("/v1/account")
@Slf4j
public class AccountController {

    private final AccountBalanceService accountService;

    public AccountController(AccountBalanceService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hi");
    }


    /**
     * 查询用户余额
     * @param id 账户 ID
     * @return
     */
    @GetMapping("/account/{id}")
    public AccountBalance queryAccountBalance(@PathVariable String id) {
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

}
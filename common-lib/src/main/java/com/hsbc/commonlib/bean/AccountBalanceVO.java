package com.hsbc.commonlib.bean;

import lombok.Data;
import lombok.NoArgsConstructor;


import java.io.Serializable;


@Data
@NoArgsConstructor

public class AccountBalanceVO implements Serializable {

    private Long accountId;
    private Long balance;
    private int version = 0;

    public AccountBalanceVO(Long accountId, Long balance, int version) {
        this.accountId = accountId;
        this.balance = balance;
        this.version = version;
    }

    public AccountBalanceVO copy() {
        AccountBalanceVO accountBalance = new AccountBalanceVO();
        accountBalance.accountId = this.getAccountId();
        accountBalance.balance =   this.getBalance();
        accountBalance.version =   this.getVersion();
        return accountBalance;
    }
}
package com.hsbc.account.repo;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@Table(name = "account_balance")
public class AccountBalance implements Serializable {
    @Id
    @Column(name = "account_id")
    private Long accountId;
    private Long balance;
    @Version
    private int version = 0;

    /**
     * 正式系统中这里应该有更多的字段， account_name, currency_code, status, update_time, create_time 等等，
     * 这里仅做研究账户余额更新，没有加
     */

    public AccountBalance(Long accountId, Long balance, int version) {
        this.accountId = accountId;
        this.balance = balance;
        this.version = version;
    }
}
package com.hsbc.account.repo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;


//扩展成 一个账户减少余额，一个账户加余额两个事件，分开处理
// 根据账户 ID 镜像 hash，交给不同机器处理
//先执行扣减，扣减成功后发送增加余额事件

//
//CREATE TABLE IF NOT EXISTS transaction_log
//        (
//        id             varchar(64) PRIMARY KEY,
//        from_account_id bigint        NOT NULL,
//        to_account_id   bigint        NOT NULL,
//        amount          bigint        NOT NULL,
//        status         varchar(16)   NOT NULL,
//        create_time    timestamp     NOT NULL DEFAULT now(),
//        update_time    timestamp     NOT NULL DEFAULT now(),
//        version        integer       NOT NULL DEFAULT 0
//        );

@Data
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transfer_log")
public class Transfer {

    @Id
    private String transactionId;
    private Long fromAccountId;
    private Long toAccountId;
    private Long amount; // 100 为 1 元，每单位为 1 分，避免处理精度问题
    private Instant create_time = Instant.EPOCH;

    // 追踪转账状态
    private String status = TransferStatus.PENDING.name();

    public Transfer(String transactionId, Long fromAccountId, Long toAccountId, Long amount){
        this.transactionId = transactionId;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
    }


}
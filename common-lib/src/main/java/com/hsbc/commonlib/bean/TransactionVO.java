package com.hsbc.commonlib.bean;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.Instant;

@Data
@ToString
@NoArgsConstructor
public class TransactionVO {

    private String transactionId;
    private Long fromAccountId;
    private Long toAccountId;
    private Long amount; // 100 为 1 元，每单位为 1 分，避免处理精度问题

    // 追踪转账状态
    private String status = "PENDING";
    private Instant create_time = Instant.EPOCH;

    public TransactionVO(String transactionId, Long fromAccountId, Long toAccountId, Long amount){
        this.transactionId = transactionId;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
    }

}
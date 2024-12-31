package com.hsbc.transaction;

import com.hsbc.commonlib.bean.TransferStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;

@Data
@ToString
@Entity
@NoArgsConstructor
@Table(name = "transfer_log")
public class Transaction {

    @Id
    private String transactionId;
    private Long fromAccountId;
    private Long toAccountId;
    private Long amount; // 100 为 1 元，每单位为 1 分，避免处理精度问题

    // 追踪转账状态
    private String status = TransferStatus.PENDING.name();
    private Instant create_time = Instant.EPOCH;

    public Transaction(String transactionId, Long fromAccountId, Long toAccountId, Long amount){
        this.transactionId = transactionId;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
    }

}
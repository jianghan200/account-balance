package com.hsbc.account.repo;

import com.hsbc.commonlib.bean.TransferStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;
import java.util.Date;

@Data
@ToString
@Entity
@NoArgsConstructor
@Table(name = "transfer_log")
public class Transfer {

    @Id
    private String transactionId;
    private Long fromAccountId;
    private Long toAccountId;
    private Long amount; // 100 为 1 元，每单位为 1 分，避免处理精度问题

    private Date create_time = new Date();
    private Date update_time = new Date();
    // 追踪转账状态
    private String status = TransferStatus.PENDING.name();

    // 这里，试验项目为了更好的观察状态，我用两个单独的字段来记录 付款和收款 两个环节的状态和它们的时间
    // 正式项目中我们可以专门创建一张收付款记录表，值使用 status 也可以实现状态记录
    private String payStatus = TransferStatus.PENDING.name();
    private Date payTime = null;
    private String receiveStatus = TransferStatus.PENDING.name();
    private Date receiveTime = null;

    public Transfer(String transactionId, Long fromAccountId, Long toAccountId, Long amount){
        this.transactionId = transactionId;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
    }

}
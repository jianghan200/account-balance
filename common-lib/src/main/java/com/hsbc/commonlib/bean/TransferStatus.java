package com.hsbc.commonlib.bean;

public enum TransferStatus {
    PENDING,
    INSUFFICIENT_FUNDS,
    PAID,
    RECEIVED, // 在收款和付款都各自一个状态的情况下，使用 RECEIVED 更 PAID 更加对称
    COMPLETED, // Paid and Received，same as received
    RECEIVED_FAILED,
    FAILED, // Pay failed
}
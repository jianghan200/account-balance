package com.hsbc.commonlib.bean;

public enum TransferStatus {
    PENDING,
    INSUFFICIENT_FUNDS,
    PAID,
    COMPLETED, // Paid and Received
    FAILED,
}
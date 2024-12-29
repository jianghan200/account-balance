package com.hsbc.account.repo;

public enum TransferStatus {
    PENDING,
    INSUFFICIENT_FUNDS,
    PAID,
    COMPLETED, // Paid and Received
    FAILED,
}
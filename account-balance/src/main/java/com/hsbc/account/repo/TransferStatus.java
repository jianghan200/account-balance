package com.hsbc.account.repo;

public enum TransferStatus {
    PENDING,
    NO_ENOUGH_MONEY,
    PAID,
    COMPLETED, // Paid and Received
    FAILED,
}
package com.hsbc.transaction.service;

import com.hsbc.transaction.Transaction;


public interface TransactionService {
    Transaction save(Transaction company);

    Transaction findById(long id);
}

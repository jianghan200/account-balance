package com.hsbc.transaction.service.impl;

import com.hsbc.transaction.Transaction;
import com.hsbc.transaction.service.TransactionService;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Override
    public Transaction save(Transaction transaction) {
        return transaction;
    }

    @Override
    public Transaction findById(long id) {
        return new Transaction();
    }
}

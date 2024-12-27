package com.hsbc.account.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferLogRepo extends JpaRepository<Transfer, String> {
}
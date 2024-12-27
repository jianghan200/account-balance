package com.hsbc.account.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountBalanceRepo extends JpaRepository<AccountBalance, Long> {

}
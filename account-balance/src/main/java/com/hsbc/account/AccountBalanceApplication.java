package com.hsbc.account;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//@EnableFeignClients(basePackages = {"com.hsbc.commonlib.client"})
@EnableCaching
@EnableRetry
@EnableJpaAuditing
@EnableTransactionManagement
@SpringBootApplication
public class AccountBalanceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountBalanceApplication.class, args);
    }
}

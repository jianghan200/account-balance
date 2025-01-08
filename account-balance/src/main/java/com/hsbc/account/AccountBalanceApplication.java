package com.hsbc.account;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

//@EnableFeignClients(basePackages = {"com.hsbc.commonlib.client"})
@EnableCaching
@EnableRetry
@EnableJpaAuditing
@EnableTransactionManagement
@SpringBootApplication
// 定时任务在测试redis分布式锁方案的时候打开
//@EnableScheduling
public class AccountBalanceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountBalanceApplication.class, args);
    }
}

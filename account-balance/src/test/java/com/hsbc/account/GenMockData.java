package com.hsbc.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * 用于生成测试数据
 */
@SpringBootTest
public class GenMockData {

    @Autowired
    JdbcTemplate jdbcTemplate;


    // 执行这个函数，插入 101个新账户，每个账户 10000 分（100 元）
    // @Test
    public void insertAccountBalanceRecords() {
        String sql = "INSERT INTO account_balance (user_id, balance, version) VALUES (?, ?, ?)";

        for (int i = 1; i <= 101; i++) {
            int userId = i;
            long balance = 10000L;
            int version = 1; // 假设version初始值为1

            // 插入单条记录
            jdbcTemplate.update(sql, userId, balance, version);
        }
    }

}
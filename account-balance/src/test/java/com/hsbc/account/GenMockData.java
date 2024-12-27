package com.hsbc.account;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@Tag("integration")
@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class GenMockData {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    JdbcTemplate jdbcTemplate;


    // 执行这个函数，插入 101个新账户，每个账户 10000 分（100 元）
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
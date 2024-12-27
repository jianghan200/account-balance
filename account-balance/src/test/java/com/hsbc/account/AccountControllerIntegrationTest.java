package com.hsbc.account;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hsbc.account.repo.Transfer;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Tag("integration")
@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AccountControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    public void accountTranferTest() throws Exception {

        Transfer transfer = new Transfer(UUID.randomUUID().toString(), 1L, 101L, 1L);

        mockMvc.perform(MockMvcRequestBuilders.post("/account:transfer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(transfer)));

        Transfer transfer2 = new Transfer(UUID.randomUUID().toString(), 101L, 1L, 1L);
        mockMvc.perform(MockMvcRequestBuilders.post("/account:transfer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(transfer2)));

        Long accountA = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.version").value(1));
        accountA = 101L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(101L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.version").value(1));
    }


    @Test
    public void queryAccountBalanceTest() throws Exception {
        Long accountA = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(accountA))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.version").value(1));
    }

    @Test
    public void transferNotEnoughMoney() throws Exception {
        Transfer transfer = new Transfer(UUID.randomUUID().toString(), 1L, 101L, 10001L);
        mockMvc.perform(MockMvcRequestBuilders.post("/account:transfer")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(transfer)));

        // Money still the same
        Long accountA = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get("/account/" + accountA).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accountId").value(1L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.balance").value(10000L))
                .andExpect(MockMvcResultMatchers.jsonPath("$.version").value(1));
    }

}
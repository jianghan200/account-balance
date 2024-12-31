package com.hsbc.commonlib.client;

import com.hsbc.commonlib.bean.AccountBalanceVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * AccountClient
 */
@FeignClient(name = "${serviceName.account-balance}", path = "/v1/account-balance", url = "${endpoint.account-balance}")
public interface AccountClient {

    @GetMapping(path = "/{id}")
    ResponseEntity<AccountBalanceVO> findById(@PathVariable("id") Long id);
}

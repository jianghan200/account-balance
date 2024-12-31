package com.hsbc.commonlib.client;

import com.hsbc.commonlib.bean.TransactionVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * TransactionClient
 */
@FeignClient(name = "${serviceName.transaction}", path = "/v1/transaction", url = "${endpoint.transaction}")
public interface TransactionClient {

    @GetMapping(path = "/{id}")
    ResponseEntity<TransactionVO> findById(@PathVariable("id") Long id);
}

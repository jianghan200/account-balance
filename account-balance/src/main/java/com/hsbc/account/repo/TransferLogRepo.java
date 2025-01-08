package com.hsbc.account.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransferLogRepo extends JpaRepository<Transfer, String> {

    // 根据 payStatus 且 create_time 与当前时间相差 1 秒以上查询 Transfer 条目
    @Query("SELECT t FROM Transfer t WHERE t.payStatus = 'PENDING' AND t.create_time < :currentTime")
    List<Transfer> findByPayStatusAndCreateTimeBefore(@Param("currentTime") Date currentTime);

    // 根据 payStatus 为 PAID，receiveStatus 为 PENDING，且 pay_time 与当前时间相差 1 秒以上查询 Transfer 条目
    @Query("SELECT t FROM Transfer t WHERE t.payStatus = 'PAID' AND t.receiveStatus = 'PENDING' AND t.payTime < :currentTime")
    List<Transfer> findByPayStatusAndReceiveStatusAndPayTimeBefore(@Param("currentTime") Date currentTime);
}
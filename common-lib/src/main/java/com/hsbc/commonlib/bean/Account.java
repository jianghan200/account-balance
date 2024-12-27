package com.hsbc.commonlib.bean;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class Account {
    private Long id;

    private String email;

    private String name;

    private String phoneNumber;

}

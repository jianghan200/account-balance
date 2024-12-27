FROM dragonwell-registry.cn-hangzhou.cr.aliyuncs.com/dragonwell/dragonwell:17

COPY ./target/account-balance-0.0.1-SNAPSHOT.jar /usr/app/

ENV TZ=Asia/Shanghai

WORKDIR /usr/app

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "account-balance-0.0.1-SNAPSHOT.jar"]
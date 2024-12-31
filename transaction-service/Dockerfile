FROM dragonwell-registry.cn-hangzhou.cr.aliyuncs.com/dragonwell/dragonwell:17

COPY ./target/transaction-service-0.0.1-SNAPSHOT.jar /usr/app/

ENV TZ=Asia/Shanghai

WORKDIR /usr/app

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "transaction-service-0.0.1-SNAPSHOT.jar"]
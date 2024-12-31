scp .\account-balance\Dockerfile root@172.17.130.105:/opt/app17/Dockerfile-account
scp .\transaction-service\Dockerfile root@172.17.130.105:/opt/app17/Dockerfile-transaction

scp .\account-balance\target\account-balance-0.0.1-SNAPSHOT.jar root@172.17.130.105:/opt/app17/target/
scp .\transaction-service\target\transaction-service-0.0.1-SNAPSHOT.jar root@172.17.130.105:/opt/app17/target/

scp -r k8s root@172.17.130.105:/opt/app17/

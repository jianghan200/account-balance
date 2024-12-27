CREATE DATABASE balance

CREATE TABLE account_balance
 (
	account_id bigint NOT NULL PRIMARY KEY,
	balance bigint NOT NULL,
	version int DEFAULT '0'
)

CREATE TABLE IF NOT EXISTS transfer_log
(
    transaction_id  VARCHAR(64) PRIMARY KEY,
    from_account_id bigint        NOT NULL,
    to_account_id   bigint        NOT NULL,
    amount          bigint        NOT NULL,
    status         varchar(16)   NOT NULL,
    create_time    timestamp     NOT NULL DEFAULT now(),
    update_time    timestamp     NOT NULL DEFAULT now(),
    version        integer       NOT NULL DEFAULT 0
);

CREATE INDEX idx_tranfer_log_status ON transaction_log (status);




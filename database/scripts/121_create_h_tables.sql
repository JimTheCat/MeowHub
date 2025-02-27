-- Table: Users
CREATE TABLE mh_users.h_users
(
    id                      varchar2(36)  DEFAULT sys_guid() NOT NULL,
    user_id                 varchar2(36)  NOT NULL,
    operation_type          varchar2(10)  NOT NULL,
    name                    varchar2(40)  NOT NULL,
    surname                 varchar2(40)  NOT NULL,
    login                   varchar2(20)  NOT NULL,
    email                   varchar2(50)  NOT NULL,
    password                varchar2(120) NOT NULL,
    birthdate               date          NOT NULL,
    gender_id               varchar2(36)  NOT NULL,
    profile_privacy_id      varchar2(36)  NOT NULL,
    posts_privacy_id        varchar2(36)  NOT NULL,
    friends_privacy_id      varchar2(36)  NOT NULL,
    role_id                 varchar2(36)  NOT NULL,
    account_non_locked      NUMBER(1)     NOT NULL,
    credentials_non_expired NUMBER(1)     NOT NULL,
    credentials_expiry_date date          NULL,
    created_at              date          NOT NULL,
    created_by              varchar2(36)  NOT NULL,
    CONSTRAINT h_users_account_non_locked_ch CHECK (account_non_locked IN (0, 1)),
    CONSTRAINT h_users_credentials_non_expired_ch CHECK (credentials_non_expired IN (0, 1)),
    CONSTRAINT h_users_operation_type_ch CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE')),
    CONSTRAINT h_users_pk PRIMARY KEY (id)
);
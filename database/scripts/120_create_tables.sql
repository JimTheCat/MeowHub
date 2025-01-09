---------------------------------------- || MH_CHATS SCHEMA || ----------------------------------------
-- Table: Chatroom_Messages
CREATE TABLE mh_chats.Chatroom_Messages
(
    id                  varchar2(36)   DEFAULT sys_guid() NOT NULL,
    chatroom_id         varchar2(36)   NOT NULL,
    author_id           varchar2(36)   NOT NULL,
    message             varchar2(2000) NOT NULL,
    answered_message_id varchar2(36)   NULL,
    created_at          date           NOT NULL,
    created_by          varchar2(36)   NOT NULL,
    modified_at         date           NULL,
    modified_by         varchar2(36)   NULL,
    CONSTRAINT Chatroom_Messages_pk PRIMARY KEY (id)
);

-- Table: Chatrooms
CREATE TABLE mh_chats.Chatrooms
(
    id            varchar2(36) DEFAULT sys_guid() NOT NULL,
    sender_id     varchar2(36) NOT NULL,
    receiver_id   varchar2(36) NOT NULL,
    sender_nick   varchar2(20) NULL,
    receiver_nick varchar2(20) NULL,
    created_at    date         NOT NULL,
    created_by    varchar2(36) NOT NULL,
    modified_at   date         NULL,
    modified_by   varchar2(36) NULL,
    CONSTRAINT Chatrooms_pk PRIMARY KEY (id)
);

---------------------------------------- || MH_POSTS SCHEMA || ----------------------------------------
-- Table: Comments
CREATE TABLE mh_posts.Comments
(
    id                  varchar2(36)   DEFAULT sys_guid() NOT NULL,
    post_id             varchar2(36)   NOT NULL,
    user_id             varchar2(36)   NOT NULL,
    content             varchar2(2000) NULL,
    comment_index       number         NULL,
    answered_comment_id varchar2(36)   NULL,
    created_at          date           NOT NULL,
    created_by          varchar2(36)   NOT NULL,
    modified_at         date           NULL,
    modified_by         varchar2(36)   NULL,
    CONSTRAINT Comments_pk PRIMARY KEY (id)
);

-- Table: Post_Pictures
CREATE TABLE mh_posts.Post_Pictures
(
    id            varchar2(36)   DEFAULT sys_guid() NOT NULL,
    post_id       varchar2(36)   NOT NULL,
    oci_name      varchar2(100)  NOT NULL,
    oci_url       varchar2(2000) NOT NULL,
    picture_index number         NOT NULL,
    created_at    date           NOT NULL,
    created_by    varchar2(36)   NOT NULL,
    modified_at   date           NULL,
    modified_by   varchar2(36)   NULL,
    CONSTRAINT Post_Pictures_pk PRIMARY KEY (id)
);

-- Table: Posts
CREATE TABLE mh_posts.Posts
(
    id           varchar2(36) DEFAULT sys_guid() NOT NULL,
    user_id      varchar2(36) NOT NULL,
    content_Html clob         NULL,
    created_at   date         NOT NULL,
    created_by   varchar2(36) NOT NULL,
    modified_at  date         NULL,
    modified_by  varchar2(36) NULL,
    CONSTRAINT Posts_pk PRIMARY KEY (id)
);

---------------------------------------- || MH_USERS SCHEMA || ----------------------------------------
-- Table: Genders
CREATE TABLE mh_users.Genders
(
    id          varchar2(36) DEFAULT sys_guid() NOT NULL,
    code        varchar2(20) NOT NULL,
    created_at  date         NOT NULL,
    created_by  varchar2(36) NOT NULL,
    modified_at date         NULL,
    modified_by varchar2(36) NULL,
    CONSTRAINT Genders_pk PRIMARY KEY (id)
);

-- Table: Privacy_Settings
CREATE TABLE mh_users.Privacy_Settings
(
    id                  varchar2(36) DEFAULT sys_guid() NOT NULL,
    code                varchar2(36) NOT NULL,
    created_at          date         NOT NULL,
    created_by          varchar2(36) NOT NULL,
    modified_at         date         NULL,
    modified_by         varchar2(36) NULL,
    CONSTRAINT Privacy_Settings_pk PRIMARY KEY (id)
);

-- Table: Roles
CREATE TABLE mh_users.Roles
(
    id          varchar2(36) DEFAULT sys_guid() NOT NULL,
    code        varchar2(10) NOT NULL,
    description varchar2(50) NULL,
    created_at  date         NOT NULL,
    created_by  varchar2(36) NOT NULL,
    modified_at date         NULL,
    modified_by varchar2(36) NULL,
    CONSTRAINT Roles_role_name_UQ UNIQUE (code),
    CONSTRAINT Roles_pk PRIMARY KEY (id)
);

-- Table: User_tokens
CREATE TABLE mh_users.User_tokens
(
    id            varchar2(36)  DEFAULT sys_guid() NOT NULL,
    user_id       varchar2(36)  NOT NULL,
    token         varchar2(512) NULL,
    refresh_token varchar2(512) NULL,
    created_at    date          NOT NULL,
    created_by    varchar2(36)  NOT NULL,
    modified_at   date          NULL,
    modified_by   varchar2(36)  NULL,
    CONSTRAINT User_tokens_pk PRIMARY KEY (id)
);

-- Table: Users
CREATE TABLE mh_users.Users
(
    id                      varchar2(36)  DEFAULT sys_guid() NOT NULL,
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
    modified_at             date          NULL,
    modified_by             varchar2(36)  NULL,
    CONSTRAINT Users_login_UQ UNIQUE (login),
    CONSTRAINT Users_email_UQ UNIQUE (email),
    CONSTRAINT users_account_non_locked_ch CHECK (account_non_locked IN (0, 1)),
    CONSTRAINT users_credentials_non_expired_ch CHECK (credentials_non_expired IN (0, 1)),
    CONSTRAINT users_pk PRIMARY KEY (id)
);

---------------------------------------- || MH_GROUPS SCHEMA || ----------------------------------------
-- Table: Groupchat_messages
CREATE TABLE mh_groups.Groupchat_messages
(
    id                  varchar2(36)   DEFAULT sys_guid() NOT NULL,
    group_id            varchar2(36)   NOT NULL,
    user_id             varchar2(36)   NOT NULL,
    message             varchar2(2000) NOT NULL,
    answered_message_id varchar2(36)   NULL,
    created_at          date           NOT NULL,
    created_by          varchar2(36)   NOT NULL,
    modified_at         date           NULL,
    modified_by         varchar2(36)   NULL,
    CONSTRAINT Groupchat_messages_pk PRIMARY KEY (id)
);

-- Table: Groups
CREATE TABLE mh_groups.Groups
(
    id          varchar2(36)   DEFAULT sys_guid() NOT NULL,
    name        varchar2(40)   NOT NULL,
    description varchar2(200)  NOT NULL,
    created_at  date           NOT NULL,
    created_by  varchar2(36)   NOT NULL,
    modified_at date           NULL,
    modified_by varchar2(36)   NULL,
    CONSTRAINT Groups_name_UQ  UNIQUE (name),
    CONSTRAINT Groups_pk PRIMARY KEY (id)
);

-- Table: User_Groups
CREATE TABLE mh_groups.User_Groups
(
    id             varchar2(36) DEFAULT sys_guid() NOT NULL,
    group_Id       varchar2(36) NOT NULL,
    user_id        varchar2(36) NOT NULL,
    accession_date date         NOT NULL,
    is_group_owner number(1)    NOT NULL,
    created_at     date         NOT NULL,
    created_by     varchar2(36) NOT NULL,
    modified_at    date         NULL,
    modified_by    varchar2(36) NULL,
    CONSTRAINT User_Groups_is_group_owner_ch CHECK (is_group_owner IN (0, 1)),
    CONSTRAINT User_Groups_pk PRIMARY KEY (id)
);

---------------------------------------- || MH_MATCHING SCHEMA || ----------------------------------------
-- Table: Like_Types
CREATE TABLE mh_matching.Like_Types
(
    id          varchar2(36) DEFAULT sys_guid() NOT NULL,
    code        varchar2(20) NOT NULL,
    created_at  date         NOT NULL,
    created_by  varchar2(36) NOT NULL,
    modified_at date         NULL,
    modified_by varchar2(36) NULL,
    CONSTRAINT Like_Types_pk PRIMARY KEY (id)
);

-- Table: Liked
CREATE TABLE mh_matching.Liked
(
    id           varchar2(36) DEFAULT sys_guid() NOT NULL,
    receiver_id  varchar2(36) NOT NULL,
    sender_id    varchar2(36) NOT NULL,
    like_type_Id varchar2(36) NOT NULL,
    created_at   date         NOT NULL,
    created_by   varchar2(36) NOT NULL,
    modified_at  date         NULL,
    modified_by  varchar2(36) NULL,
    CONSTRAINT Liked_pk PRIMARY KEY (id)
);

-- Table: Matching_Chat_Messages
CREATE TABLE mh_matching.Matching_Chat_Messages
(
    id                  varchar2(36)   DEFAULT sys_guid() NOT NULL,
    match_chat_id       varchar2(36)   NOT NULL,
    matching_profile_id varchar2(36)   NOT NULL,
    message             varchar2(2000) NOT NULL,
    created_at          date           NOT NULL,
    created_by          varchar2(36)   NOT NULL,
    modified_at         date           NULL,
    modified_by         varchar2(36)   NULL,
    CONSTRAINT Matching_Chat_Messages_pk PRIMARY KEY (id)
);

-- Table: Matching_Chats
CREATE TABLE mh_matching.Matching_Chats
(
    id          varchar2(36) DEFAULT sys_guid() NOT NULL,
    sender_id   varchar2(36) NOT NULL,
    receiver_id varchar2(36) NOT NULL,
    created_at  date         NOT NULL,
    created_by  varchar2(36) NOT NULL,
    modified_at date         NULL,
    modified_by varchar2(36) NULL,
    CONSTRAINT Matching_Chats_pk PRIMARY KEY (id)
);

-- Table: Matching_Profile_Pictures
CREATE TABLE mh_matching.Matching_Profile_Pictures
(
    id                  varchar2(36)   DEFAULT sys_guid() NOT NULL,
    matching_profile_id varchar2(36)   NOT NULL,
    oci_name            varchar2(100)  NOT NULL,
    oci_url             varchar2(2000) NOT NULL,
    picture_index       number         NOT NULL,
    created_at          date           NOT NULL,
    created_by          varchar2(36)   NOT NULL,
    modified_at         date           NULL,
    modified_by         varchar2(36)   NULL,
    CONSTRAINT Matching_Profile_id_idx UNIQUE (matching_profile_id),
    CONSTRAINT Matching_Profile_Pictures_pk PRIMARY KEY (id)
);

-- Table: Matching_Profiles
CREATE TABLE mh_matching.Matching_Profiles
(
    id                   varchar2(36)   DEFAULT sys_guid() NOT NULL,
    user_id              varchar2(36)   NOT NULL,
    profile_details_html varchar2(2000) NULL,
    created_at           date           NOT NULL,
    created_by           varchar2(36)   NOT NULL,
    modified_at          date           NULL,
    modified_by          varchar2(36)   NULL,
    CONSTRAINT Matching_Profiles_pk PRIMARY KEY (id)
);

---------------------------------------- || MH_PROFILES SCHEMA || ----------------------------------------
-- Table: Profile_Data
CREATE TABLE mh_profiles.Profile_Data
(
    id          varchar2(36) DEFAULT sys_guid() NOT NULL,
    code        varchar2(40) NOT NULL,
    created_at  date         NOT NULL,
    created_by  varchar2(36) NOT NULL,
    modified_at date         NULL,
    modified_by varchar2(36) NULL,
    CONSTRAINT Profile_Data_pk PRIMARY KEY (id)
);

-- Table: Profile_Pictures
CREATE TABLE mh_profiles.Profile_Pictures
(
    id            varchar2(36)   DEFAULT sys_guid() NOT NULL,
    profile_id    varchar2(36)   NOT NULL,
    oci_name      varchar2(100)  NOT NULL,
    oci_url       varchar2(2000) NOT NULL,
    picture_index number         NOT NULL,
    created_at    date           NOT NULL,
    created_by    varchar2(36)   NOT NULL,
    modified_at   date           NULL,
    modified_by   varchar2(36)   NULL,
    CONSTRAINT Profile_Pictures_pk PRIMARY KEY (id)
);

-- Table: Profile_User_Data
CREATE TABLE mh_profiles.Profile_User_Data
(
    id              varchar2(36)  DEFAULT sys_guid() NOT NULL,
    profile_id      varchar2(36)  NOT NULL,
    profile_data_Id varchar2(36)  NOT NULL,
    content         varchar2(200) NOT NULL,
    created_at      date          NOT NULL,
    created_by      varchar2(36)  NOT NULL,
    modified_at     date          NULL,
    modified_by     varchar2(36)  NULL,
    CONSTRAINT Profile_User_Data_pk PRIMARY KEY (id)
);

-- Table: Profiles
CREATE TABLE mh_profiles.Profiles
(
    id                   varchar2(36) DEFAULT sys_guid() NOT NULL,
    user_id              varchar2(36) NOT NULL,
    profile_details_html clob         NULL,
    created_at           date         NOT NULL,
    created_by           varchar2(36) NOT NULL,
    modified_at          date         NULL,
    modified_by          varchar2(36) NULL,
    CONSTRAINT Profiles_pk PRIMARY KEY (id)
);

---------------------------------------- || MH_USER_RELATIONS SCHEMA || ----------------------------------------
-- Table: User_Relations
CREATE TABLE mh_user_relations.User_Relations
(
    id               varchar2(36) DEFAULT sys_guid() NOT NULL,
    relation_type_id varchar2(36) NOT NULL,
    sender_id        varchar2(36) NOT NULL,
    receiver_id      varchar2(36) NOT NULL,
    send_date        date         NOT NULL,
    answer_date      date         NULL,
    created_at       date         NOT NULL,
    created_by       varchar2(36) NOT NULL,
    modified_at      date         NULL,
    modified_by      varchar2(36) NULL,
    CONSTRAINT User_Relations_pk PRIMARY KEY (id),
    CONSTRAINT UQ_Sender_Receiver UNIQUE (sender_id, receiver_id)
);

-- Table: Relation_Types
CREATE TABLE mh_user_relations.Relation_Types
(
    id          varchar2(36) DEFAULT sys_guid() NOT NULL,
    code        varchar2(20) NOT NULL,
    created_at  date         NOT NULL,
    created_by  varchar2(36) NOT NULL,
    modified_at date         NULL,
    modified_by varchar2(36) NULL,
    CONSTRAINT Relation_Type_code_UQ UNIQUE (code),
    CONSTRAINT Relation_Types_pk PRIMARY KEY (id)
);
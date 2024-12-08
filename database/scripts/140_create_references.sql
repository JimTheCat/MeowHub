-- foreign keys

---------------------------------------- || MH_CHATS SCHEMA || ----------------------------------------
-- Reference: Chat_Message_Chat_Room (table: Chatroom_Messages)
ALTER TABLE mh_chats.Chatroom_Messages
    ADD CONSTRAINT Chat_Message_Chat_Room
        FOREIGN KEY (chatroom_id)
            REFERENCES mh_chats.Chatrooms (id);

-- Reference: Chat_Messages_Chat_Messages (table: Chatroom_Messages)
ALTER TABLE mh_chats.Chatroom_Messages
    ADD CONSTRAINT Chat_Messages_Chat_Messages
        FOREIGN KEY (answered_message_id)
            REFERENCES mh_chats.Chatroom_Messages (id);

-- Reference: Chat_Messages_Users (table: Chatroom_Messages)
ALTER TABLE mh_chats.Chatroom_Messages
    ADD CONSTRAINT Chat_Messages_Users
        FOREIGN KEY (author_id)
            REFERENCES mh_users.Users (id);

-- Reference: Chatrooms_Users_Receiver_FK (table: Chatrooms)
ALTER TABLE mh_chats.Chatrooms
    ADD CONSTRAINT Chatrooms_Users_Receiver_FK
        FOREIGN KEY (sender_id)
            REFERENCES mh_users.Users (id);

-- Reference: Chatrooms_Users_Sender_FK (table: Chatrooms)
ALTER TABLE mh_chats.Chatrooms
    ADD CONSTRAINT Chatrooms_Users_Sender_FK
        FOREIGN KEY (receiver_id)
            REFERENCES mh_users.Users (id);

---------------------------------------- || MH_POSTS SCHEMA || ----------------------------------------
-- Reference: Comments_Comments (table: Comments)
ALTER TABLE mh_posts.Comments
    ADD CONSTRAINT Comments_Comments
        FOREIGN KEY (answered_comment_id)
            REFERENCES mh_posts.Comments (id);

-- Reference: Comments_Posts (table: Comments)
ALTER TABLE mh_posts.Comments
    ADD CONSTRAINT Comments_Posts
        FOREIGN KEY (post_id)
            REFERENCES mh_posts.Posts (id);

-- Reference: Comments_Users (table: Comments)
ALTER TABLE mh_posts.Comments
    ADD CONSTRAINT Comments_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

---------------------------------------- || MH_GROUPS SCHEMA || ----------------------------------------
-- Reference: Groupchat_messages_Groups (table: Groupchat_messages)
ALTER TABLE mh_groups.Groupchat_messages
    ADD CONSTRAINT Groupchat_messages_Groups
        FOREIGN KEY (group_id)
            REFERENCES mh_groups.Groups (id);

-- Reference: Groupchat_messages_Users (table: Groupchat_messages)
ALTER TABLE mh_groups.Groupchat_messages
    ADD CONSTRAINT Groupchat_messages_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

-- Reference: Groupchat_messages_answer (table: Groupchat_messages)
ALTER TABLE mh_groups.Groupchat_messages
    ADD CONSTRAINT Groupchat_messages_answer
        FOREIGN KEY (answered_message_id)
            REFERENCES mh_groups.Groupchat_messages (id);

-- Reference: Groups_Pictures (table: Groups)
ALTER TABLE mh_groups.Groups
    ADD CONSTRAINT Groups_Pictures
        FOREIGN KEY (picture_id)
            REFERENCES mh_users.Pictures (id);

-- Reference: User_Groups_Groups (table: User_Groups)
ALTER TABLE mh_groups.User_Groups
    ADD CONSTRAINT User_Groups_Groups
        FOREIGN KEY (group_Id)
            REFERENCES mh_groups.Groups (id);

-- Reference: User_Groups_Users (table: User_Groups)
ALTER TABLE mh_groups.User_Groups
    ADD CONSTRAINT User_Groups_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

---------------------------------------- || MH_MATCHING SCHEMA || ----------------------------------------
-- Reference: Liked_Like_Types (table: Liked)
ALTER TABLE mh_matching.Liked
    ADD CONSTRAINT Liked_Like_Types
        FOREIGN KEY (like_type_Id)
            REFERENCES mh_matching.Like_Types (id);

-- Reference: Liked_Matching_Profile_R (table: Liked)
ALTER TABLE mh_matching.Liked
    ADD CONSTRAINT Liked_Matching_Profile_R
        FOREIGN KEY (receiver_id)
            REFERENCES mh_matching.Matching_Profiles (id);

-- Reference: Liked_Matching_Profile_S (table: Liked)
ALTER TABLE mh_matching.Liked
    ADD CONSTRAINT Liked_Matching_Profile_S
        FOREIGN KEY (sender_id)
            REFERENCES mh_matching.Matching_Profiles (id);

-- Reference: Match_Chat_Messages_Answered (table: Matching_Chat_Messages)
ALTER TABLE mh_matching.Matching_Chat_Messages
    ADD CONSTRAINT Match_Chat_Messages_Answered
        FOREIGN KEY (match_chat_id)
            REFERENCES mh_matching.Matching_Chats (id);

-- Reference: Match_Chat_Messages_MP (table: Matching_Chat_Messages)
ALTER TABLE mh_matching.Matching_Chat_Messages
    ADD CONSTRAINT Match_Chat_Messages_MP
        FOREIGN KEY (matching_profile_id)
            REFERENCES mh_matching.Matching_Profiles (id);

-- Reference: Match_Chats_Matching_Profile_R (table: Matching_Chats)
ALTER TABLE mh_matching.Matching_Chats
    ADD CONSTRAINT Match_Chats_Matching_Profile_R
        FOREIGN KEY (receiver_id)
            REFERENCES mh_matching.Matching_Profiles (id);

-- Reference: Match_Chats_Matching_Profile_S (table: Matching_Chats)
ALTER TABLE mh_matching.Matching_Chats
    ADD CONSTRAINT Match_Chats_Matching_Profile_S
        FOREIGN KEY (sender_id)
            REFERENCES mh_matching.Matching_Profiles (id);

-- Reference: Matching_Profile_Pictures (table: Matching_Profile_Pictures)
ALTER TABLE mh_matching.Matching_Profile_Pictures
    ADD CONSTRAINT Matching_Profile_Pictures
        FOREIGN KEY (picture_id)
            REFERENCES mh_users.Pictures (id);

-- Reference: Matching_Profile_Pictures_MP (table: Matching_Profile_Pictures)
ALTER TABLE mh_matching.Matching_Profile_Pictures
    ADD CONSTRAINT Matching_Profile_Pictures_MP
        FOREIGN KEY (matching_profile_id)
            REFERENCES mh_matching.Matching_Profiles (id);

-- Reference: Matching_Profile_Users (table: Matching_Profiles)
ALTER TABLE mh_matching.Matching_Profiles
    ADD CONSTRAINT Matching_Profile_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

---------------------------------------- || MH_USERS SCHEMA || ----------------------------------------
-- Reference: Pictures_Users (table: Pictures)
ALTER TABLE mh_users.Pictures
    ADD CONSTRAINT Pictures_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

-- Reference: User_tokens_Users (table: User_tokens)
ALTER TABLE mh_users.User_tokens
    ADD CONSTRAINT User_tokens_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

-- Reference: Users_Friends_Privacy_Settings (table: Users)
ALTER TABLE mh_users.Users
    ADD CONSTRAINT Users_Friends_Privacy_Settings
        FOREIGN KEY (posts_privacy_id)
            REFERENCES mh_users.Privacy_Settings (id);

-- Reference: Users_Genders (table: Users)
ALTER TABLE mh_users.Users
    ADD CONSTRAINT Users_Genders
        FOREIGN KEY (gender_id)
            REFERENCES mh_users.Genders (id);

-- Reference: Users_Posts_Privacy_Settings (table: Users)
ALTER TABLE mh_users.Users
    ADD CONSTRAINT Users_Posts_Privacy_Settings
        FOREIGN KEY (friends_privacy_id)
            REFERENCES mh_users.Privacy_Settings (id);

-- Reference: Users_Profile_Privacy_Settings (table: Users)
ALTER TABLE mh_users.Users
    ADD CONSTRAINT Users_Profile_Privacy_Settings
        FOREIGN KEY (profile_privacy_id)
            REFERENCES mh_users.Privacy_Settings (id);

-- Reference: Users_User_types (table: Users)
ALTER TABLE mh_users.Users
    ADD CONSTRAINT Users_User_types
        FOREIGN KEY (role_id)
            REFERENCES mh_users.Roles (id);

---------------------------------------- || MH_POSTS SCHEMA || ----------------------------------------
-- Reference: Posts_Pictures_Pictures (table: Post_Pictures)
ALTER TABLE mh_posts.Post_Pictures
    ADD CONSTRAINT Posts_Pictures_Pictures
        FOREIGN KEY (picture_id)
            REFERENCES mh_users.Pictures (id);

-- Reference: Posts_Pictures_Posts (table: Post_Pictures)
ALTER TABLE mh_posts.Post_Pictures
    ADD CONSTRAINT Posts_Pictures_Posts
        FOREIGN KEY (post_id)
            REFERENCES mh_posts.Posts (id);

-- Reference: Posts_Users (table: Posts)
ALTER TABLE mh_posts.Posts
    ADD CONSTRAINT Posts_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

---------------------------------------- || MH_PROFILES SCHEMA || ----------------------------------------
-- Reference: Profile_Pictures_Pictures (table: Profile_Pictures)
ALTER TABLE mh_profiles.Profile_Pictures
    ADD CONSTRAINT Profile_Pictures_Pictures
        FOREIGN KEY (picture_id)
            REFERENCES mh_users.Pictures (id);

-- Reference: Profile_Pictures_Profiles (table: Profile_Pictures)
ALTER TABLE mh_profiles.Profile_Pictures
    ADD CONSTRAINT Profile_Pictures_Profiles
        FOREIGN KEY (profile_id)
            REFERENCES mh_profiles.Profiles (id);

-- Reference: Profile_User_Data_Profile_Data (table: Profile_User_Data)
ALTER TABLE mh_profiles.Profile_User_Data
    ADD CONSTRAINT Profile_User_Data_Profile_Data
        FOREIGN KEY (profile_data_Id)
            REFERENCES mh_profiles.Profile_Data (id);

-- Reference: Profile_User_Data_Profiles (table: Profile_User_Data)
ALTER TABLE mh_profiles.Profile_User_Data
    ADD CONSTRAINT Profile_User_Data_Profiles
        FOREIGN KEY (profile_id)
            REFERENCES mh_profiles.Profiles (id);

-- Reference: Profiles_Users (table: Profiles)
ALTER TABLE mh_profiles.Profiles
    ADD CONSTRAINT Profiles_Users
        FOREIGN KEY (user_id)
            REFERENCES mh_users.Users (id);

---------------------------------------- || MH_USER_RELATIONS SCHEMA || ----------------------------------------
-- Reference: Users_Relations_Users_Receiver (table: User_Relations)
ALTER TABLE mh_user_relations.User_Relations
    ADD CONSTRAINT Users_Relations_Users_Receiver
        FOREIGN KEY (receiver_id)
            REFERENCES mh_users.Users (id);

-- Reference: Users_Relations_Users_Sender (table: User_Relations)
ALTER TABLE mh_user_relations.User_Relations
    ADD CONSTRAINT Users_Relations_Users_Sender
        FOREIGN KEY (sender_id)
            REFERENCES mh_users.Users (id);

-- Reference: Users_Relations_Relation_Type (table: User_Relations)
ALTER TABLE mh_user_relations.User_Relations
    ADD CONSTRAINT Users_Relations_Relation_Type
        FOREIGN KEY (relation_type_id)
            REFERENCES mh_user_relations.Relation_Types (id);
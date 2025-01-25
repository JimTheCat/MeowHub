---------------------------------------- || MH_CHATS SCHEMA || ----------------------------------------
-- Table: mh_chats.chatrooms
CREATE INDEX mh_chats.Chatrooms_sender_id_idx
    on mh_chats.Chatrooms
        (sender_id ASC)
;

CREATE INDEX mh_chats.Chatrooms_receiver_id_idx
    on mh_chats.Chatrooms
        (receiver_id ASC)
;

---------------------------------------- || MH_POSTS SCHEMA || ----------------------------------------
-- Table: mh_posts.Comments
CREATE INDEX mh_posts.Comments_post_id_idx
    on mh_posts.Comments
        (post_id ASC)
;

CREATE INDEX mh_posts.Comments_user_id_idx
    on mh_posts.Comments
        (user_id ASC)
;

-- Table: mh_posts.Post_Pictures
CREATE INDEX mh_posts.Post_Pictures_post_id_idx
    on mh_posts.Post_Pictures
        (post_id ASC)
;

-- Table: mh_posts.Posts
CREATE INDEX mh_chats.Posts_user_id_idx
    on mh_posts.Posts
        (user_id ASC)
;

---------------------------------------- || MH_MATCHING SCHEMA || ----------------------------------------
CREATE INDEX mh_matching.Liked_receiver_id_idx
    on mh_matching.Liked
        (receiver_id ASC)
;

CREATE INDEX mh_matching.Liked_sender_id_idx
    on mh_matching.Liked
        (sender_id ASC)
;

-- Table: mh_matching.Matching_Chat_Messages
CREATE INDEX mh_matching.Match_Chat_Msg_chat_id_idx
    on mh_matching.Matching_Chat_Messages
        (match_chat_id ASC)
;

-- Table: mh_matching.Matching_Chats
CREATE INDEX mh_matching.Matching_Chats_sender_id_idx
    on mh_matching.Matching_Chats
        (sender_id ASC)
;

CREATE INDEX mh_matching.Matching_Chats_receiver_id_idx
    on mh_matching.Matching_Chats
        (receiver_id ASC)
;

CREATE INDEX Matching_Profiles_sexuality_id_idx
    on mh_matching.Matching_Profiles
        (Sexuality_id ASC)
;

CREATE INDEX Matching_Profiles_pets_id_idx
    on mh_matching.Matching_Profiles
        (Pets_id ASC)
;

CREATE INDEX Matching_Profiles_education_id_idx
    on mh_matching.Matching_Profiles
        (Education_id ASC)
;

CREATE INDEX Matching_Profiles_looking_for_id_idx
    on mh_matching.Matching_Profiles
        (Looking_for_id ASC)
;

CREATE INDEX Matching_Profiles_smoker_id_idx
    on mh_matching.Matching_Profiles
        (smoker_id ASC)
;

CREATE INDEX Matching_Profiles_exercises_id_idx
    on mh_matching.Matching_Profiles
        (exercises_id ASC)
;

CREATE INDEX Matching_Profiles_drinker_id_idx
    on mh_matching.Matching_Profiles
        (drinker_id ASC)
;

-- Table: mh_matching.Matching_Profiles_Pictures
CREATE INDEX Matching_Profiles_Pictures_is_current_pp_idx
    on mh_matching.MATCHING_PROFILE_PICTURES
        (is_current_pp ASC)
;

CREATE INDEX Matching_Profiles_Pictures_matching_profile_id_idx
    on mh_matching.MATCHING_PROFILE_PICTURES
        (matching_profile_id ASC)
;
---------------------------------------- || MH_PROFILES SCHEMA || ----------------------------------------

-- Table: mh_profiles.Profiles
CREATE INDEX mh_profiles.Profiles_user_id_idx
    on mh_profiles.Profiles
        (user_id ASC)
;

---------------------------------------- || MH_GROUPS SCHEMA || ----------------------------------------
-- Table: mh_groups.User_Groups
CREATE INDEX mh_groups.User_Groups_user_id_idx
    on mh_groups.User_Groups
        (user_id ASC)
;

---------------------------------------- || MH_USER_RELATIONS SCHEMA || ----------------------------------------
-- Table: mh_user_relations.User_Relations
CREATE INDEX mh_user_relations.User_Relations_receiver_id_idx
    on mh_user_relations.User_Relations
        (receiver_id ASC)
;

CREATE INDEX mh_user_relations.User_Relations_sender_id_idx
    on mh_user_relations.User_Relations
        (sender_id ASC)
;
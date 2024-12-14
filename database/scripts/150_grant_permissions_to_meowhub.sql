--groups
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_groups.groupchat_messages TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_groups.groups TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_groups.user_groups TO mh_meowhub;

--chats
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_chats.chatrooms TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_chats.chatroom_messages TO mh_meowhub;

--matching
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_matching.matching_chats TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_matching.matching_chat_messages TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_matching.matching_profiles TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_matching.liked TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_matching.like_types TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_matching.matching_profile_pictures TO mh_meowhub;

--users
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_users.users TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_users.privacy_settings TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_users.user_tokens TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_users.roles TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_users.genders TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_users.pictures TO mh_meowhub;
GRANT SELECT ON mh_users.h_users TO mh_meowhub;

--user_relations
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_user_relations.relation_types TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_user_relations.user_relations TO mh_meowhub;

--profiles
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_profiles.profile_data TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_profiles.profile_user_data TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_profiles.profiles TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_profiles.profile_pictures TO mh_meowhub;

--posts
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_posts.posts TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_posts.post_pictures TO mh_meowhub;
GRANT SELECT, INSERT, UPDATE, DELETE ON mh_posts.comments TO mh_meowhub;
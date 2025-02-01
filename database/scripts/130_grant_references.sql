-- grant references to users.users
GRANT REFERENCES ON mh_users.users   TO mh_chats;
GRANT REFERENCES ON mh_users.users   TO mh_posts;
GRANT REFERENCES ON mh_users.users   TO mh_user_relations;
GRANT REFERENCES ON mh_users.users   TO mh_matching;
GRANT REFERENCES ON mh_users.genders TO mh_matching;
GRANT REFERENCES ON mh_users.users   TO mh_profiles;
-- grant references to users.users
GRANT REFERENCES ON mh_users.users TO mh_chats;
GRANT REFERENCES ON mh_users.users TO mh_posts;
GRANT REFERENCES ON mh_users.users TO mh_groups;
GRANT REFERENCES ON mh_users.users TO mh_user_relations;
GRANT REFERENCES ON mh_users.users TO mh_matching;
GRANT REFERENCES ON mh_users.users TO mh_profiles;

-- grant references to users.pictures
GRANT REFERENCES ON mh_users.pictures TO mh_profiles;
GRANT REFERENCES ON mh_users.pictures TO mh_matching;
GRANT REFERENCES ON mh_users.pictures TO mh_posts;
GRANT REFERENCES ON mh_users.pictures TO mh_groups;
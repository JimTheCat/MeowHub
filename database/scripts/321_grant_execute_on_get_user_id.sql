-- Grant execute on get_user_id function to all schemas to use it in triggers
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_chats;
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_users;
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_matching;
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_posts;
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_profiles;
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_user_relations;
GRANT EXECUTE ON mh_meowhub.get_user_id TO mh_groups;

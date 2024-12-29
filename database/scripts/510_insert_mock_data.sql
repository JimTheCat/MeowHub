
DECLARE
    l_user_id VARCHAR2(36);
    l_admin_id VARCHAR2(36);
    l_relation_type_friends_id VARCHAR2(36);
BEGIN
    --get needed id's

    SELECT id
    INTO l_user_id
    FROM mh_users.users
    WHERE login = 'user1';

    SELECT id
    INTO l_admin_id
    FROM mh_users.users
    WHERE login = 'admin';

    SELECT id
    INTO l_relation_type_friends_id
    FROM mh_user_relations.relation_types
    WHERE code = 'FRIENDS';

--mh_users.pictures
    INSERT INTO mh_users.pictures (id, user_id, picture)
    VALUES (1, l_user_id, UTL_RAW.CAST_TO_RAW('9ffdc87faedbe...b27777ce')); -- Skrócona treść pliku

    INSERT INTO mh_users.pictures (id, user_id, picture)
    VALUES (2, l_admin_id, UTL_RAW.CAST_TO_RAW('1ffdc87faedbe...b27777ce')); -- Skrócona treść pliku

--mh_posts.posts
    INSERT INTO mh_posts.posts (id, user_id, content_html) VALUES (1, l_user_id, 'Hello world from user - 1');
    INSERT INTO mh_posts.posts (id, user_id, content_html) VALUES (2, l_admin_id, 'Hello world from admin - 1');
    INSERT INTO mh_posts.posts (id, user_id, content_html) VALUES (3, l_admin_id, 'Hello world from admin - 2');

--mh_posts.post_pictures
    INSERT INTO mh_posts.post_pictures (id, post_id, picture_id, picture_index) VALUES (1, 1, 1, 0);

--mh_posts.comments
    INSERT INTO mh_posts.comments (id, post_id, user_id, answered_comment_id, content) VALUES (1, 3, l_user_id, NULL, 'Nice post');
    INSERT INTO mh_posts.comments (id, post_id, user_id, answered_comment_id, content) VALUES (2, 3, l_user_id, 1, 'Yeah, I agree');

--mh_profiles.profiles
    INSERT INTO mh_profiles.profiles (id, user_id, profile_details_html) VALUES (1, l_user_id, 'Hello this is my profile');
    INSERT INTO mh_profiles.profiles (id, user_id, profile_details_html) VALUES (2, l_admin_id, 'ADMIN is my name, and this is my profile:D');


--mh_profiles.profile_pictures
    INSERT INTO mh_profiles.profile_pictures (id, profile_id, picture_id, picture_index) VALUES (1, 2, 2, 0);

--mh_profiles.profile_data
    INSERT INTO mh_profiles.profile_data (id, code) VALUES (1, 'Urodzony w:');
    INSERT INTO mh_profiles.profile_data (id, code) VALUES (2, 'W relacji:');

--mh_profiles.profile_user_data
    INSERT INTO mh_profiles.profile_user_data (id, profile_id, profile_data_id, content)
    VALUES (1, 1, 1, 'Warszawa');

    INSERT INTO mh_profiles.profile_user_data (id, profile_id, profile_data_id, content)
    VALUES (2, 1, 1, 'Wolny');

--mh_user_relations.user_relations
    INSERT INTO mh_user_relations.user_relations (id, sender_id, receiver_id, relation_type_id, send_date)
    VALUES (1, l_user_id, l_admin_id, l_relation_type_friends_id, TO_TIMESTAMP('2024-12-29 12:00:00', 'YYYY-MM-DD HH24:MI:SS'));

    COMMIT;

END;

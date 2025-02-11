---------------------------------------- || MH_USERS SCHEMA AUDIT TRIGGERS || ----------------------------------------
CREATE OR REPLACE TRIGGER mh_users.users_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_users.users
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_users.roles_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_users.roles
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_users.privacy_settints_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_users.privacy_settings
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_users.genders_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_users.genders
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/


CREATE OR REPLACE TRIGGER mh_users.online_status_trg
    BEFORE INSERT OR UPDATE
    ON mh_users.online_status
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

---------------------------------------- || MH_USER_RELATIONS SCHEMA AUDIT TRIGGERS || ----------------------------------------
CREATE OR REPLACE TRIGGER mh_user_relations.user_relations_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_user_relations.user_relations
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/


CREATE OR REPLACE TRIGGER mh_user_relations.relation_types_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_user_relations.relation_types
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id();
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

---------------------------------------- || MH_CHATS SCHEMA AUDIT TRIGGERS || ----------------------------------------
CREATE OR REPLACE TRIGGER mh_chats.chatrooms_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_chats.chatrooms
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_chats.chatroom_messages_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_chats.chatroom_messages
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

---------------------------------------- || MH_POSTS SCHEMA AUDIT TRIGGERS || ----------------------------------------
CREATE OR REPLACE TRIGGER mh_posts.posts_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_posts.posts
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_posts.post_pictures_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_posts.post_pictures
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_posts.posts_comments_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_posts.comments
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

---------------------------------------- || MH_PROFILES SCHEMA AUDIT TRIGGERS || ----------------------------------------
CREATE OR REPLACE TRIGGER mh_profiles.profiles_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_profiles.profiles
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_profiles.profile_pictures_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_profiles.profile_pictures
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

---------------------------------------- || MH_MATCHING SCHEMA AUDIT TRIGGERS || ----------------------------------------
CREATE OR REPLACE TRIGGER mh_matching.matching_profiles_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.matching_profiles
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.age        := TRUNC(MONTHS_BETWEEN(SYSDATE, :NEW.birthdate) / 12);
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.matching_chats_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.matching_chats
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.matching_chat_messages_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.matching_chat_messages
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.liked_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.liked
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.like_types_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.like_types
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.matching_profile_pictures_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.matching_profile_pictures
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.looking_for_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.looking_for
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.pets_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.pets
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.sexuality_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.sexuality
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.education_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.education
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_matching.how_often_audit_trg
    BEFORE INSERT OR UPDATE
    ON mh_matching.how_often
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.created_at := CURRENT_TIMESTAMP;
        :NEW.created_by := mh_meowhub.get_user_id;
    ELSIF UPDATING THEN
        :NEW.modified_at := CURRENT_TIMESTAMP;
        :NEW.modified_by := mh_meowhub.get_user_id;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER mh_users.h_users_trg
    AFTER INSERT OR UPDATE OR DELETE ON mh_users.users
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO mh_users.h_users (user_id, operation_type, name, surname, login, email, password, salt, birthdate, gender_id, profile_privacy_id, posts_privacy_id, friends_privacy_id, role_id, account_non_locked, credentials_non_expired, credentials_expiry_date, created_at, created_by)
        VALUES (:NEW.id,'INSERT', :NEW.name, :NEW.surname, :NEW.login, :NEW.email, :NEW.password, :NEW.salt, :NEW.birthdate, :NEW.gender_id, :NEW.profile_privacy_id, :NEW.posts_privacy_id, :NEW.friends_privacy_id, :NEW.role_id, :NEW.account_non_locked, :NEW.credentials_non_expired, :NEW.credentials_expiry_date, :NEW.created_at, :NEW.created_by);
    ELSIF UPDATING THEN
        INSERT INTO mh_users.h_users (user_id, operation_type, name, surname, login, email, password, salt, birthdate, gender_id, profile_privacy_id, posts_privacy_id, friends_privacy_id, role_id, account_non_locked, credentials_non_expired, credentials_expiry_date, created_at, created_by)
        VALUES (:NEW.id, 'UPDATE', :NEW.name, :NEW.surname, :NEW.login, :NEW.email, :NEW.password, :NEW.salt, :NEW.birthdate, :NEW.gender_id, :NEW.profile_privacy_id, :NEW.posts_privacy_id, :NEW.friends_privacy_id, :NEW.role_id, :NEW.account_non_locked, :NEW.credentials_non_expired, :NEW.credentials_expiry_date, :NEW.created_at, :NEW.created_by);
    ELSIF DELETING THEN
        INSERT INTO mh_users.h_users (user_id, operation_type, name, surname, login, email, password, salt, birthdate, gender_id, profile_privacy_id, posts_privacy_id, friends_privacy_id, role_id, account_non_locked, credentials_non_expired, credentials_expiry_date, created_at, created_by)
        VALUES (:OLD.id, 'DELETE', :OLD.name, :OLD.surname, :OLD.login, :OLD.email, :OLD.password, :OLD.salt, :OLD.birthdate, :OLD.gender_id, :OLD.profile_privacy_id, :OLD.posts_privacy_id, :OLD.friends_privacy_id, :OLD.role_id, :OLD.account_non_locked, :OLD.credentials_non_expired, :OLD.credentials_expiry_date, :OLD.created_at, :OLD.created_by);
    END IF;
END;
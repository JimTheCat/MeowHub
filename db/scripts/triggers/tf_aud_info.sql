-- funkcja uniwersalna wykorzystywana dla trigger'ów audytowych before insert
/*
trigger audytowy:
 - uzupełnienie 4 kolumn audytowe
 - liczba modyfikacji danego rekordu (?)
 - t_nazwa_tabeli_aud/def
 - ostemplowanie daty mod i utworzenia oraz autora (za to ma odpowiadać)
 - nie odpowiada za delete
 - before insert/update
 - blokada UPDATE na create_date i create_user
 - zastanowić się, czy token, który jest często odświeżany powinien być w tabelce users, (bo wtedy będzie mnóstwo rekordów w h_users), możnaby stworzyć tabelkę 1 do 1 np users_sessions z id_user, refresh_token itd
*/

-- TRIGGER dla tabeli user_roles
CREATE OR REPLACE TRIGGER trg_user_roles_aud_info
    BEFORE INSERT OR UPDATE ON user_roles
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1; -- Ustaw ID użytkownika na bieżącego
        :NEW.create_date := SYSTIMESTAMP; -- Ustaw datę utworzenia na bieżący timestamp
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1; -- Ustaw ID użytkownika na bieżącego
        :NEW.mod_date := SYSTIMESTAMP; -- Ustaw datę modyfikacji na bieżący timestamp

        -- Zablokowanie aktualizacji kolumn create_date i create_user_id
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

-- Analogiczne TRIGGERY dla pozostałych tabel:

CREATE OR REPLACE TRIGGER trg_users_aud_info
    BEFORE INSERT OR UPDATE ON users
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_user_status_aud_info
    BEFORE INSERT OR UPDATE ON user_status
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_images_aud_info
    BEFORE INSERT OR UPDATE ON images
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_groups_aud_info
    BEFORE INSERT OR UPDATE ON groups
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_tags_aud_info
    BEFORE INSERT OR UPDATE ON tags
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_posts_aud_info
    BEFORE INSERT OR UPDATE ON posts
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_comments_aud_info
    BEFORE INSERT OR UPDATE ON comments
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_group_users_aud_info
    BEFORE INSERT OR UPDATE ON group_users
                                FOR EACH ROW
BEGIN
    IF INSERTING THEN
        :NEW.create_user_id := -1;
        :NEW.create_date := SYSTIMESTAMP;
    ELSIF UPDATING THEN
        :NEW.mod_user_id := -1;
        :NEW.mod_date := SYSTIMESTAMP;
        :NEW.create_user_id := :OLD.create_user_id;
        :NEW.create_date := :OLD.create_date;
END IF;
END;
/

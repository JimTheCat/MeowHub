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

CREATE OR REPLACE PROCEDURE sp_aud_info(p_op IN VARCHAR2, p_new IN OUT SYS_REFCURSOR) IS
BEGIN
    IF p_op = 'INSERT' THEN
        UPDATE p_new
        SET create_user_id = -1,   -- Ustaw ID użytkownika na bieżącego
            create_date = SYSTIMESTAMP; -- Ustaw datę utworzenia na bieżący timestamp
    ELSIF p_op = 'UPDATE' THEN
        UPDATE p_new
        SET mod_user_id = -1,     -- Ustaw ID użytkownika na bieżącego
            mod_date = SYSTIMESTAMP; -- Ustaw datę modyfikacji na bieżący timestamp
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_user_roles_aud_info
    BEFORE INSERT OR UPDATE ON user_roles
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_users_aud_info
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_user_status_aud_info
    BEFORE INSERT OR UPDATE ON user_status
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_images_aud_info
    BEFORE INSERT OR UPDATE ON images
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_groups_aud_info
    BEFORE INSERT OR UPDATE ON groups
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_tags_aud_info
    BEFORE INSERT OR UPDATE ON tags
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_posts_aud_info
    BEFORE INSERT OR UPDATE ON posts
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_comments_aud_info
    BEFORE INSERT OR UPDATE ON comments
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

CREATE OR REPLACE TRIGGER trg_group_users_aud_info
    BEFORE INSERT OR UPDATE ON group_users
    FOR EACH ROW
BEGIN
    sp_aud_info(INSERTING OR UPDATING, :NEW);
END;
/

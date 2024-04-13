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

CREATE OR REPLACE FUNCTION tf_aud_info()
RETURNS TRIGGER AS $$
BEGIN
  -- Set create_user_id and create_date on INSERT
  IF TG_OP = 'INSERT' THEN
    NEW.create_user_id := -1;             -- Set create_user_id to the current user
    NEW.create_date := current_timestamp; -- Set create_date to the current timestamp
  END IF;

    -- Set mod_user_id and mod_date on UPDATE
  IF TG_OP = 'UPDATE' THEN
    NEW.mod_user_id := -1;             -- Set mod_user_id to the current user
    NEW.mod_date := current_timestamp; -- Set mod_date to the current timestamp
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

--User_Roles
CREATE TRIGGER t_user_roles_aud_info
BEFORE INSERT OR UPDATE ON user_roles
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Users
CREATE TRIGGER t_users_aud_info
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Status
CREATE TRIGGER t_status_aud_info
BEFORE INSERT OR UPDATE ON status
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Posts
CREATE TRIGGER t_posts_aud_info
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Images
CREATE TRIGGER t_images_aud_info
BEFORE INSERT OR UPDATE ON images
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Posts_Images
CREATE TRIGGER t_posts_images_aud_info
BEFORE INSERT OR UPDATE ON posts_images
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Tags
CREATE TRIGGER t_tags_aud_info
BEFORE INSERT OR UPDATE ON tags
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Posts_Tags
CREATE TRIGGER t_posts_tags_aud_info
BEFORE INSERT OR UPDATE ON posts_tags 
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Comments
CREATE TRIGGER t_comments_aud_info
BEFORE INSERT OR UPDATE ON comments
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Groups
CREATE TRIGGER t_groups_aud_info
BEFORE INSERT OR UPDATE ON groups
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

--Group_users
CREATE TRIGGER t_groups_users_aud_info
BEFORE INSERT OR UPDATE ON group_users
FOR EACH ROW EXECUTE FUNCTION tf_aud_info();

commit;
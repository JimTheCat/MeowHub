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

CREATE OR REPLACE FUNCTION tf_hist()
RETURNS TRIGGER AS $$
DECLARE
  h_table_name TEXT;
  col_name TEXT;
  col_names TEXT := '';
BEGIN
  -- Determine the h_ prefix table name
  h_table_name := 'h_' || TG_TABLE_NAME;

  -- Get column names
  FOR col_name IN
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = TG_TABLE_NAME
    ORDER BY ordinal_position
  LOOP
    -- Concatenate column names
    col_names := col_names || quote_ident(col_name) || ', ';
  END LOOP;

  -- Remove the trailing comma and space from col_names
  col_names := substring(col_names from 1 for char_length(col_names) - 2);

  -- Check if the operation is INSERT, UPDATE, or DELETE
  IF TG_OP IN ('INSERT', 'UPDATE', 'DELETE') THEN
    -- Construct the dynamic SQL for INSERT operation into the h_ prefix table
    EXECUTE FORMAT('INSERT INTO %I (h_oper, %s) VALUES (''%s'', $1.*)', h_table_name, col_names, substr(TG_OP, 1, 1))
    USING OLD;

    -- Return the old row to allow the original operation to proceed
    RETURN OLD;
  END IF;

  -- If the operation is not INSERT, UPDATE, or DELETE, simply return the old row
  RETURN OLD;
END;
$$ LANGUAGE PLPGSQL;


-- Table: h_user_roles
CREATE TRIGGER t_h_user_roles_hist_info
BEFORE INSERT OR UPDATE ON user_roles
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_users
CREATE TRIGGER t_h_users_hist_info
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_status
CREATE TRIGGER t_h_status_hist_info
BEFORE INSERT OR UPDATE ON status
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_posts
CREATE TRIGGER t_h_posts_hist_info
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_images
CREATE TRIGGER t_h_images_hist_info
BEFORE INSERT OR UPDATE ON images
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_posts_images
CREATE TRIGGER t_h_posts_images_hist_info
BEFORE INSERT OR UPDATE ON posts_images
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_tags
CREATE TRIGGER t_h_tags_hist_info
BEFORE INSERT OR UPDATE ON tags
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_posts_tags
CREATE TRIGGER t_h_posts_tags_hist_info
BEFORE INSERT OR UPDATE ON posts_tags 
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_comments
CREATE TRIGGER t_h_comments_hist_info
BEFORE INSERT OR UPDATE ON comments
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_groups
CREATE TRIGGER t_h_groups_hist_info
BEFORE INSERT OR UPDATE ON groups
FOR EACH ROW EXECUTE FUNCTION tf_hist();

-- Table: h_group_users
CREATE TRIGGER t_h_group_users_hist_info
BEFORE INSERT OR UPDATE ON group_users
FOR EACH ROW EXECUTE FUNCTION tf_hist();
	

commit;
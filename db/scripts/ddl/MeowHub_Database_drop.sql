-- Drop constraints
ALTER TABLE users DROP CONSTRAINT IF EXISTS fk_role;
ALTER TABLE users DROP CONSTRAINT IF EXISTS fk_status;
ALTER TABLE groups DROP CONSTRAINT IF EXISTS fk_images_id;
ALTER TABLE comments DROP CONSTRAINT IF EXISTS fk_comments_users;
ALTER TABLE comments DROP CONSTRAINT IF EXISTS fk_comments_posts;
ALTER TABLE group_users DROP CONSTRAINT IF EXISTS fk_group_users_groups;
ALTER TABLE group_users DROP CONSTRAINT IF EXISTS fk_group_users_users;
ALTER TABLE posts_images DROP CONSTRAINT IF EXISTS fk_posts_images_posts;
ALTER TABLE posts_images DROP CONSTRAINT IF EXISTS fk_posts_images_images;
ALTER TABLE posts_tags DROP CONSTRAINT IF EXISTS fk_posts_tags_posts;
ALTER TABLE posts_tags DROP CONSTRAINT IF EXISTS fk_posts_tags_tags;

-- Drop tables
DROP TABLE IF EXISTS posts_tags;
DROP TABLE IF EXISTS posts_images;
DROP TABLE IF EXISTS group_users;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS DUAL;
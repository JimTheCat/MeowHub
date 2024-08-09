-- Insert into user_roles
INSERT INTO user_roles (name, description, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Admin', 'Administrator role', 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO user_roles (name, description, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('User', 'Regular user role', 1, SYSTIMESTAMP, NULL, NULL);

-- Insert into user_status
INSERT INTO user_status (name, description, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Active', 'Active status', 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO user_status (name, description, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Inactive', 'Inactive status', 1, SYSTIMESTAMP, NULL, NULL);

-- Insert into images
INSERT INTO images (image, create_user_id, create_date, mod_user_id, mod_date)
VALUES (EMPTY_BLOB(), 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO images (image, create_user_id, create_date, mod_user_id, mod_date)
VALUES (EMPTY_BLOB(), 2, SYSTIMESTAMP, NULL, NULL);

-- Insert into groups
INSERT INTO groups (name, description, images_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Group1', 'First group', 1, 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO groups (name, description, images_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Group2', 'Second group', 2, 1, SYSTIMESTAMP, NULL, NULL);

-- Insert into tags
INSERT INTO tags (name, description, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Technology', 'Tech related posts', 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO tags (name, description, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Lifestyle', 'Lifestyle related posts', 1, SYSTIMESTAMP, NULL, NULL);

-- Insert into users
INSERT INTO users (login, name, second_name, lastname, password, salt, refresh_token, role, birthdate, email, status, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('jdoe', 'John', 'A', 'Doe', 'password1', 'salt1', NULL, 1, TO_DATE('1990-01-01', 'YYYY-MM-DD'), 'jdoe@example.com', 1, 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO users (login, name, second_name, lastname, password, salt, refresh_token, role, birthdate, email, status, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('asmith', 'Anna', 'B', 'Smith', 'password2', 'salt2', NULL, 2, TO_DATE('1985-05-10', 'YYYY-MM-DD'), 'asmith@example.com', 1, 1, SYSTIMESTAMP, NULL, NULL);

-- Insert into posts
INSERT INTO posts (content, post_date, users_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('This is the first post.', 1, 1, 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO posts (content, post_date, users_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('This is the second post.', 2, 2, 2, SYSTIMESTAMP, NULL, NULL);

-- Insert into comments
INSERT INTO comments (comment, users_id, posts_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Great post!', 1, 1, 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO comments (comment, users_id, posts_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES ('Thanks for sharing.', 2, 2, 2, SYSTIMESTAMP, NULL, NULL);

-- Insert into group_users
INSERT INTO group_users (groups_id, users_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES (1, 1, 1, SYSTIMESTAMP, NULL, NULL);
INSERT INTO group_users (groups_id, users_id, create_user_id, create_date, mod_user_id, mod_date)
VALUES (2, 2, 1, SYSTIMESTAMP, NULL, NULL);

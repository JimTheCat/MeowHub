-- Insert into user_roles
INSERT INTO user_roles (name, description)
VALUES ('Admin', 'Administrator role');
INSERT INTO user_roles (name, description)
VALUES ('User', 'Regular user role');

-- Insert into user_status
INSERT INTO user_status (name, description)
VALUES ('Active', 'Active status');
INSERT INTO user_status (name, description)
VALUES ('Inactive', 'Inactive status');

-- Insert into images
INSERT INTO images (image)
VALUES (EMPTY_BLOB());
INSERT INTO images (image)
VALUES (EMPTY_BLOB());

-- Insert into groups
INSERT INTO groups (name, description, images_id)
VALUES ('Group1', 'First group', 1);
INSERT INTO groups (name, description, images_id)
VALUES ('Group2', 'Second group', 2);

-- Insert into tags
INSERT INTO tags (name, description)
VALUES ('Technology', 'Tech related posts');
INSERT INTO tags (name, description)
VALUES ('Lifestyle', 'Lifestyle related posts');

-- Insert into users
INSERT INTO users (login, name, second_name, lastname, password, salt, role, birthdate, email, status)
VALUES ('admin', 'admin', '', 'lastname', 'admin', 'salt1', 1, TO_DATE('1990-01-01', 'YYYY-MM-DD'), 'jdoe@example.com', 1);
INSERT INTO users (login, name, second_name, lastname, password, salt, role, birthdate, email, status)
VALUES ('user', 'user', 'B', 'Smith', 'user', 'salt2', 2, TO_DATE('1985-05-10', 'YYYY-MM-DD'), 'asmith@example.com', 1);

-- Insert into posts
INSERT INTO posts (content, post_date, user_id)
VALUES ('This is the first post.', 1, 1);
INSERT INTO posts (content, post_date, user_id)
VALUES ('This is the second post.', 2, 2);

-- Insert into comments
INSERT INTO comments (comment_value, users_id, posts_id)
VALUES ('Great post!', 1, 1);
INSERT INTO comments (comment_value, users_id, posts_id)
VALUES ('Thanks for sharing.', 2, 2);

-- Insert into group_users
INSERT INTO group_users (groups_id, users_id)
VALUES (1, 1);
INSERT INTO group_users (groups_id, users_id)
VALUES (2, 2);

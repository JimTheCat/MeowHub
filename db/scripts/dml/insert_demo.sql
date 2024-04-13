-- Table: user_roles
INSERT INTO user_roles (id, name, description, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'Admin', 'Administrator role', 1, current_timestamp, NULL, NULL),
(2, 'User', 'Regular user role', 1, current_timestamp, NULL, NULL);

-- Table: status
INSERT INTO status (id, name, description, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'Active', 'Active status', 1, current_timestamp, NULL, NULL),
(2, 'Inactive', 'Inactive status', 1, current_timestamp, NULL, NULL);

-- Table: images
INSERT INTO images (id, image, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, E'\\x', 1, current_timestamp, NULL, NULL),
(2, E'\\x', 1, current_timestamp, NULL, NULL);

-- Table: groups
INSERT INTO groups (id, name, description, images_id, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'Group A', 'Description for Group A', 1, 1, current_timestamp, NULL, NULL),
(2, 'Group B', 'Description for Group B', 1, 1, current_timestamp, NULL, NULL);

-- Table: tags
INSERT INTO tags (id, name, description, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'Tag1', 'Description for Tag1', 1, current_timestamp, NULL, NULL),
(2, 'Tag2', 'Description for Tag2', 1, current_timestamp, NULL, NULL);

-- Table: users
INSERT INTO users (id, login, name, second_name, lastname, password, salt, refresh_token, role, birthdate, email, status, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'user1', 'John', NULL, 'Doe', 'password1', 'salt1', NULL, 1, '1990-01-01', 'john.doe@example.com', 1, 1, current_timestamp, NULL, NULL),
(2, 'user2', 'Jane', NULL, 'Smith', 'password2', 'salt2', NULL, 2, '1991-02-02', 'jane.smith@example.com', 1, 1, current_timestamp, NULL, NULL);

-- Table: posts
INSERT INTO posts (id, content, date, users_id, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'Post content 1', 1234567890, 1, 1, current_timestamp, NULL, NULL),
(2, 'Post content 2', 1234567890, 2, 1, current_timestamp, NULL, NULL);

-- Table: comments
INSERT INTO comments (idi, comment, users_id, posts_id, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 'Comment 1', 1, 1, 1, current_timestamp, NULL, NULL),
(2, 'Comment 2', 2, 2, 1, current_timestamp, NULL, NULL);

-- Table: group_users
INSERT INTO group_users (groups_id, users_id, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 1, 1, current_timestamp, NULL, NULL),
(2, 2, 1, current_timestamp, NULL, NULL);

-- Table: posts_images
INSERT INTO posts_images (posts_id, images_id, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 1, 1, current_timestamp, NULL, NULL),
(2, 2, 1, current_timestamp, NULL, NULL);

-- Table: posts_tags
INSERT INTO posts_tags (posts_id, tags_id, create_user_id, create_date, mod_user_id, mod_date) VALUES 
(1, 1, 1, current_timestamp, NULL, NULL),
(2, 2, 1, current_timestamp, NULL, NULL);


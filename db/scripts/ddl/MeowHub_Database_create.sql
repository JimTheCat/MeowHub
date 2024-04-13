-- Table: user_roles
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(250),
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: status
CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: images
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    image BYTEA NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: groups
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(250),
    images_id INT,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT fk_images_id FOREIGN KEY (images_id) REFERENCES images(id)
);

-- Table: tags
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT tags_name_uq UNIQUE (name)
);

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(10) NOT NULL,
    name VARCHAR(20) NOT NULL,
    second_name VARCHAR(20),
    lastname VARCHAR(20) NOT NULL,
    password VARCHAR(40) NOT NULL,
    salt VARCHAR(40) NOT NULL,
    refresh_token INT,
    role INT NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(40) NOT NULL,
    status INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT users_login_uq UNIQUE (login),
    CONSTRAINT users_email_uq UNIQUE (email),
    CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES user_roles(id),
    CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES status(id)
);

-- Table: posts
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content VARCHAR(5000) NOT NULL,
    date INT NOT NULL,
    users_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT fk_users_id FOREIGN KEY (users_id) REFERENCES users(id)
);

-- Table: comments
CREATE TABLE comments (
    idi SERIAL PRIMARY KEY,
    comment VARCHAR(2000) NOT NULL,
    users_id INT NOT NULL,
    posts_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT fk_comments_users FOREIGN KEY (users_id) REFERENCES users(id),
    CONSTRAINT fk_comments_posts FOREIGN KEY (posts_id) REFERENCES posts(id)
);

-- Table: group_users
CREATE TABLE group_users (
    groups_id INT NOT NULL,
    users_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT group_users_pk PRIMARY KEY (groups_id, users_id),
    CONSTRAINT fk_group_users_groups FOREIGN KEY (groups_id) REFERENCES groups(id),
    CONSTRAINT fk_group_users_users FOREIGN KEY (users_id) REFERENCES users(id)
);

-- Table: posts_images
CREATE TABLE posts_images (
    posts_id INT NOT NULL,
    images_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT posts_images_pk PRIMARY KEY (posts_id, images_id),
    CONSTRAINT fk_posts_images_posts FOREIGN KEY (posts_id) REFERENCES posts(id),
    CONSTRAINT fk_posts_images_images FOREIGN KEY (images_id) REFERENCES images(id)
);

-- Table: posts_tags
CREATE TABLE posts_tags (
    posts_id INT NOT NULL,
    tags_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT posts_tags_pk PRIMARY KEY (posts_id, tags_id),
    CONSTRAINT fk_posts_tags_posts FOREIGN KEY (posts_id) REFERENCES posts(id),
    CONSTRAINT fk_posts_tags_tags FOREIGN KEY (tags_id) REFERENCES tags(id)
);

-- Create Dual table:
CREATE TABLE DUAL (
    DUMMY VARCHAR(1)
);

INSERT INTO DUAL (DUMMY) VALUES ('X');





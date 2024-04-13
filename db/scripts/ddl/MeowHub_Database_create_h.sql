-- Table: h_user_roles
CREATE TABLE h_user_roles (
    h_id SERIAL PRIMARY KEY,
	id INT,
    h_oper VARCHAR(1),
	name VARCHAR(30) NOT NULL,
    description VARCHAR(250),
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_status
CREATE TABLE h_status (
    h_id SERIAL PRIMARY KEY,
    h_oper VARCHAR(1),
	id INT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_images
CREATE TABLE h_images (
    h_id SERIAL PRIMARY KEY,
    h_oper VARCHAR(1),
	id INT,
    image BYTEA NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_groups
CREATE TABLE h_groups (
    h_id SERIAL PRIMARY KEY,
    h_oper VARCHAR(1),
	id INT,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(250),
    images_id INT,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_tags
CREATE TABLE h_tags (
    h_id SERIAL PRIMARY KEY,
    h_oper VARCHAR(1),
	id INT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_users
CREATE TABLE h_users (
    h_id SERIAL PRIMARY KEY,
	h_oper VARCHAR(1),
	id INT,
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
    mod_date TIMESTAMP
);

-- Table: h_posts
CREATE TABLE h_posts (
    h_id SERIAL PRIMARY KEY,
	h_oper VARCHAR(1),
	id INT,
    content VARCHAR(5000) NOT NULL,
    date INT NOT NULL,
    users_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP,
    CONSTRAINT fk_users_id FOREIGN KEY (users_id) REFERENCES h_users(h_id)
);

-- Table: h_comments
CREATE TABLE h_comments (
    h_id SERIAL PRIMARY KEY,
	h_oper VARCHAR(1),
	id INT,
    comment VARCHAR(2000) NOT NULL,
    users_id INT NOT NULL,
    posts_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_group_users
CREATE TABLE h_group_users (
	h_id SERIAL PRIMARY KEY,
	h_oper VARCHAR(1),
    groups_id INT NOT NULL,
    users_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_posts_images
CREATE TABLE h_posts_images (
	h_id SERIAL PRIMARY KEY,
	h_oper VARCHAR(1),
    posts_id INT NOT NULL,
    images_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

-- Table: h_posts_tags
CREATE TABLE h_posts_tags (
	h_id SERIAL PRIMARY KEY,
	h_oper VARCHAR(1),
    posts_id INT NOT NULL,
    tags_id INT NOT NULL,
    create_user_id INT NOT NULL,
    create_date TIMESTAMP NOT NULL,
    mod_user_id INT,
    mod_date TIMESTAMP
);

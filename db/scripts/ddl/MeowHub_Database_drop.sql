-- Usunięcie tabel, zaczynając od tabel z zależnościami

-- Drop Table: group_users
DROP TABLE group_users CASCADE CONSTRAINTS;

-- Drop Table: comments
DROP TABLE comments CASCADE CONSTRAINTS;

-- Drop Table: posts
DROP TABLE posts CASCADE CONSTRAINTS;

-- Drop Table: users
DROP TABLE users CASCADE CONSTRAINTS;

-- Drop Table: tags
DROP TABLE tags CASCADE CONSTRAINTS;

-- Drop Table: groups
DROP TABLE groups CASCADE CONSTRAINTS;

-- Drop Table: images
DROP TABLE images CASCADE CONSTRAINTS;

-- Drop Table: user_status
DROP TABLE user_status CASCADE CONSTRAINTS;

-- Drop Table: user_roles
DROP TABLE user_roles CASCADE CONSTRAINTS;

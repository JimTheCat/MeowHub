-- Usuwanie tabel, zaczynając od tabel z zależnościami

-- Drop Table: h_posts_tags
DROP TABLE h_posts_tags CASCADE CONSTRAINTS;

-- Drop Table: h_posts_images
DROP TABLE h_posts_images CASCADE CONSTRAINTS;

-- Drop Table: h_group_users
DROP TABLE h_group_users CASCADE CONSTRAINTS;

-- Drop Table: h_comments
DROP TABLE h_comments CASCADE CONSTRAINTS;

-- Drop Table: h_posts
DROP TABLE h_posts CASCADE CONSTRAINTS;

-- Drop Table: h_users
DROP TABLE h_users CASCADE CONSTRAINTS;

--DROP Table: h_users_sessions
DROP TABLE h_users_sessions CASCADE CONSTRAINTS;

-- Drop Table: h_tags
DROP TABLE h_tags CASCADE CONSTRAINTS;

-- Drop Table: h_groups
DROP TABLE h_groups CASCADE CONSTRAINTS;

-- Drop Table: h_images
DROP TABLE h_images CASCADE CONSTRAINTS;

-- Drop Table: h_user_status
DROP TABLE h_user_status CASCADE CONSTRAINTS;

-- Drop Table: h_user_roles
DROP TABLE h_user_roles CASCADE CONSTRAINTS;

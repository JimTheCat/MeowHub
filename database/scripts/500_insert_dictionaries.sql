-- insert into dictionary tables

---------------------------------------- || MH_USERS SCHEMA || ----------------------------------------
-- table: mh_users.roles
INSERT INTO mh_users.roles (code, description) VALUES ('ROLE_USER', 'Regular user role with basic permissions');
INSERT INTO mh_users.roles (code, description) VALUES ('ROLE_ADMIN', 'Admin role with all permissions');

-- table: mh_users.genders
INSERT INTO mh_users.genders (code) VALUES ('FEMALE');
INSERT INTO mh_users.genders (code) VALUES ('MALE');
INSERT INTO mh_users.genders (code) VALUES ('OTHER');

-- table: mh_users.privacy_settings
INSERT INTO mh_users.privacy_settings (code) VALUES ('PUBLIC');
INSERT INTO mh_users.privacy_settings (code) VALUES ('PRIVATE');
INSERT INTO mh_users.privacy_settings (code) VALUES ('FRIENDS_ONLY');

---------------------------------------- || MH_USER_RELATIONS SCHEMA || ----------------------------------------
-- table: mh_user_relations.relations_types
INSERT INTO mh_user_relations.relation_types (code) VALUES ('SENT_INVITATION');
INSERT INTO mh_user_relations.relation_types (code) VALUES ('REJECTED');
INSERT INTO mh_user_relations.relation_types (code) VALUES ('FRIENDS');

---------------------------------------- || MH_MATCHING_SCHEMA || ----------------------------------------
-- table: mh_matching.pets
INSERT INTO mh_matching.pets (code) VALUES ('DOG');
INSERT INTO mh_matching.pets (code) VALUES ('CAT');
INSERT INTO mh_matching.pets (code) VALUES ('BIRD');
INSERT INTO mh_matching.pets (code) VALUES ('FISH');
INSERT INTO mh_matching.pets (code) VALUES ('RODENT');
INSERT INTO mh_matching.pets (code) VALUES ('REPTILE');
INSERT INTO mh_matching.pets (code) VALUES ('OTHER');

-- table: mh_matching.sexuality
INSERT INTO mh_matching.sexuality (code) VALUES ('HETEROSEXUAL');
INSERT INTO mh_matching.sexuality (code) VALUES ('HOMOSEXUAL');
INSERT INTO mh_matching.sexuality (code) VALUES ('BISEXUAL');
INSERT INTO mh_matching.sexuality (code) VALUES ('QUESTIONING');
INSERT INTO mh_matching.sexuality (code) VALUES ('ASEXUAL');
INSERT INTO mh_matching.sexuality (code) VALUES ('OTHER');

-- table: mh_matching.how_often
INSERT INTO mh_matching.how_often (code) VALUES ('EVERYDAY');
INSERT INTO mh_matching.how_often (code) VALUES ('OFTEN');
INSERT INTO mh_matching.how_often (code) VALUES ('FROM_TIME_TO_TIME');
INSERT INTO mh_matching.how_often (code) VALUES ('RARELY');
INSERT INTO mh_matching.how_often (code) VALUES ('NEVER');

-- table: mh_matching.looking_for
INSERT INTO mh_matching.looking_for (code) VALUES ('ANYTHING');
INSERT INTO mh_matching.looking_for (code) VALUES ('FRIENDSHIP');
INSERT INTO mh_matching.looking_for (code) VALUES ('RELATIONSHIP');
INSERT INTO mh_matching.looking_for (code) VALUES ('CHAT');

-- table: mh_matching.education
INSERT INTO mh_matching.education (code) VALUES ('PRIMARY_SCHOOL');
INSERT INTO mh_matching.education (code) VALUES ('SECONDARY_SCHOOL');
INSERT INTO mh_matching.education (code) VALUES ('HIGH_SCHOOL');
INSERT INTO mh_matching.education (code) VALUES ('COLLEGE');
INSERT INTO mh_matching.education (code) VALUES ('UNIVERSITY');
INSERT INTO mh_matching.education (code) VALUES ('POSTGRADUATE');

-- table: mh_matching.like_types
INSERT INTO mh_matching.like_types (code) VALUES ('LIKE');
INSERT INTO mh_matching.like_types (code) VALUES ('DISLIKE');
INSERT INTO mh_matching.like_types (code) VALUES ('BLOCK');
INSERT INTO mh_matching.like_types (code) VALUES ('MATCH');


COMMIT;



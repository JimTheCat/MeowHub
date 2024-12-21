-- insert into dictionary tables

---------------------------------------- || MH_USERS SCHEMA || ----------------------------------------
-- table: mh_users.roles
INSERT INTO mh_users.roles (code, description) VALUES ('USER_ROLE', 'Regular user role with basic permissions');
INSERT INTO mh_users.roles (code, description) VALUES ('ADMIN_ROLE', 'Admin role with all permissions');

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

COMMIT;
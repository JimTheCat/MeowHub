WHENEVER SQLERROR EXIT SQL.SQLCODE;

--drop
@scripts/000_drop_schemas.sql
@scripts/010_drop_profiles.sql

--create
@scripts/100_create_profiles.sql
@scripts/110_create_schemas.sql
@scripts/120_create_tables.sql
@scripts/121_create_h_tables.sql
@scripts/130_grant_references.sql
@scripts/140_create_references.sql
@scripts/150_grant_permissions_to_meowhub.sql
@scripts/160_create_indexes.sql

--plsql objects
@scripts/300_set_session_attributes.pls
@scripts/310_clear_session_attributes.pls
@scripts/320_get_user_id.pls
@scripts/321_grant_execute_on_get_user_id.sql
@scripts/330_mh_matching_set_age_job.sql

--triggers
@scripts/400_create_audit_triggers.sql
@scripts/401_create_h_tables_triggers.sql

--insert
@scripts/500_insert_dictionaries.sql

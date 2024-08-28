-- Prepare DB and Create User
@/opt/oracle/scripts/startup/ddl/prepare_db_create_user_meowhub.sql

-- Disconnect from SYS and reconnect as meowhub
connect meowhub/meowhub@XEPDB1

-- Run the rest of the scripts as meowhub
@/opt/oracle/scripts/startup/ddl/MeowHub_Database_drop.sql
@/opt/oracle/scripts/startup/ddl/MeowHub_Database_drop_h.sql
@/opt/oracle/scripts/startup/ddl/MeowHub_Database_create.sql
@/opt/oracle/scripts/startup/ddl/MeowHub_Database_create_h.sql
@/opt/oracle/scripts/startup/triggers/tf_aud_info.sql
@/opt/oracle/scripts/startup/dml/insert_demo.sql
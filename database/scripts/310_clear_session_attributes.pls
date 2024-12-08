CREATE OR REPLACE PROCEDURE mh_meowhub.clear_session_attributes
AS
BEGIN
    -- Clear client identifier
    DBMS_SESSION.CLEAR_IDENTIFIER;
END;
/
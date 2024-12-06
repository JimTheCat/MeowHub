CREATE OR REPLACE PROCEDURE mh_meowhub.set_session_attributes(
    p_user_id IN VARCHAR2
) AS
BEGIN
    -- Check input parameters
    IF p_user_id IS NULL THEN
        RAISE_APPLICATION_ERROR(-20000, 'User id cannot be null');
    END IF;

    IF length(p_user_id) > 36  THEN
        RAISE_APPLICATION_ERROR(-20001, 'User id cannot be longer than 36 characters');
    END IF;

    -- Set client identifier
    DBMS_SESSION.SET_IDENTIFIER(p_user_id);
END;
/
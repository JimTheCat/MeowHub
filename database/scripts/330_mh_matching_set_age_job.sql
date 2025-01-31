BEGIN
    DBMS_SCHEDULER.create_job (
            job_name        => 'UPDATE_AGE_JOB',
            job_type        => 'PLSQL_BLOCK',
            job_action      => 'BEGIN
                               UPDATE mh_matching.Matching_Profiles
                               SET age = TRUNC(MONTHS_BETWEEN(SYSDATE, birthdate) / 12);
                            END;',
            start_date      => SYSTIMESTAMP,
            repeat_interval => 'FREQ=DAILY; BYHOUR=0;',
            enabled         => TRUE
    );
END;
/

--tu run the job manually use the following command:
-- BEGIN
--     DBMS_SCHEDULER.run_job('UPDATE_AGE_JOB');
-- END;
-- /


--dodatkowe (pomocnicze zapytania)

--sprawdzenie, na jakiej instancji jest uruchomiona nasza baza danych (chcemy PWD)
SHOW CON_NAME;

--sprawdzenie na jakiej wersji bazy działamy, np. "Oracle Database 21c Express Edition Release 21.0.0.0.0 - Production"
SELECT banner FROM v$version WHERE ROWNUM = 1;

--sprawdzenie dostępnych kontenerów
show pdbs;

--sprawdzenie na jakim użytkowniku jesteśmy zalogowani
show user;

--stworzenie użytkownika globalnego dla CDB - istnieje dla wszystkich dziedziczącyh po nim PDB
--CREATE USER C##app_user IDENTIFIED BY app_user;

--Zmiana z CBD na PDB
ALTER SESSION SET CONTAINER = XEPDB1;

--stworzenie user'a na kontenerze
CREATE USER meowhub identified by meowhub;
GRANT ALL PRIVILEGES TO meowhub;


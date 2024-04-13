--Ściągawka: przydatne zapytania itd

/*Dane o bazie, tabelach i użytkownikach*/
--lista tabel w db
SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';

--lista kolumn w danej tabeli
SELECT * FROM pg_catalog.pg_columns WHERE tablename = 'nazwa_tabeli';

--lista użytkowników
SELECT * FROM pg_catalog.pg_roles;

--metadane o tabelach i kolumnach zgodnie z normą ANSI SQL
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
SELECT * FROM information_schema.columns WHERE table_name = 'nazwa_tabeli';


/*Dane o błędnych lub rozkompilowanych obiektach na bazie*/

--W poniższych zapytaniach proisvalid oznacza, czy dana funkcja/procedura jest poprawna. 
--W przypadku triggerów, sprawdzamy, czy funkcja wyzwalacza jest poprawna.

--lista błędnych funkcji
SELECT * FROM pg_proc WHERE proisagg = FALSE AND proisvalid = FALSE;

--lista błędnych procedur składowanych (tj. funkcji nie będących agregatami)
SELECT * FROM pg_proc WHERE proisagg = FALSE AND proisvalid = FALSE AND prokind = 'p';

--lista błędnych triggerów
SELECT * FROM pg_trigger WHERE tgisinternal = FALSE AND NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE pg_proc.oid = pg_trigger.tgfoid AND proisvalid
);


/*Grupowanie zapytań i tabel po jednym użytkownikiem/schematem*/
CREATE SCHEMA moj_schema;

CREATE OR REPLACE FUNCTION moj_schema.moja_funkcja()
RETURNS void AS $$
BEGIN
    -- Tutaj wpisz kod funkcji
END;
$$ LANGUAGE plpgsql;


/*Triggery*/
CREATE OR REPLACE FUNCTION set_create_info()
RETURNS TRIGGER AS $$ --$$ określa początek i koniec bloku kodu
BEGIN
    NEW.create_user_id := current_user; -- Ustawia create_user_id na aktualnego użytkownika
    NEW.create_date := current_timestamp; -- Ustawia create_date na bieżącą datę i godzinę
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;  -- linia mówiąca o tym, w jakim języku została napisana funkcja (plpgsql) 

CREATE TRIGGER set_create_info_trigger --triggery w POSTGRE korzystają z funkcji, które zwracają triggery
BEFORE INSERT ON YourTableName
FOR EACH ROW
EXECUTE FUNCTION set_create_info();

/*Wyszukanie wszystkich triggerów na tabelach*/
--warto wiedzieć, że jak dropujesz tabele, to wszystkie triggery z nimi powiązane również lecą
SELECT 
    tgname AS trigger_name,
    relname AS table_name,
    tgrelid::regclass AS table_id,
    proname AS function_name
FROM 
    pg_trigger
JOIN 
    pg_class ON tgrelid = pg_class.oid
JOIN
    pg_proc ON tgfoid = pg_proc.oid
WHERE 
    tgconstraint = 0; --eliminuje wyzwalacze dla ograniczeń, pozostawiając tylko wyzwalacze tabelowe.


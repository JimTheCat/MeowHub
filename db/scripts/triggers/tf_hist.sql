-- funkcja uniwersalna wykorzystywana dla trigger'ów audytowych before insert
/*
trigger audytowy: 
 - uzupełnienie 4 kolumn audytowe
 - liczba modyfikacji danego rekordu (?)
 - t_nazwa_tabeli_aud/def
 - ostemplowanie daty mod i utworzenia oraz autora (za to ma odpowiadać)
 - nie odpowiada za delete
 - before insert/update
 - blokada UPDATE na create_date i create_user
 - zastanowić się, czy token, który jest często odświeżany powinien być w tabelce users, (bo wtedy będzie mnóstwo rekordów w h_users), możnaby stworzyć tabelkę 1 do 1 np users_sessions z id_user, refresh_token itd 
*/

--TODO
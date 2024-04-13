-- Categories
INSERT INTO Categories (Name, Description) VALUES
                                               ('Action', 'Games that involve physical challenges, including hand–eye coordination and reaction-time.'),
                                               ('Adventure', 'Games that include a variety of challenges, including problem-solving, exploration, and narrative.'),
                                               ('Simulation', 'Games that attempt to mimic real-world activities, elements, or systems.'),
                                               ('Role-Playing', 'Games where players assume the roles of characters in a fictional setting.'),
                                               ('Strategy', 'Games that emphasize skillful thinking and planning to achieve victory.'),
                                               ('Sports', 'Games based on real-world sports.'),
                                               ('Racing', 'Games involving racing vehicles or animals in competition.'),
                                               ('Puzzle', 'Games that challenge the player to solve problems and complete tasks.'),
                                               ('Horror', 'Games designed to scare or shock players with eerie and frightening atmospheres.'),
                                               ('Indie', 'Games developed by independent game developers outside the mainstream industry.');


-- Games
INSERT INTO Games (Name, Description, Price, Image, Quantity) VALUES
                                                           ('The Witcher 3: Wild Hunt', 'Open-world action role-playing game.', 49.99,'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/220px-Witcher_3_cover_art.jpg', 100),
                                                           ('Call of Duty: Modern Warfare', '', 59.99, 'https://image.api.playstation.com/vulcan/img/rnd/202008/1900/lTSvbByTYMqy6R22teoybKCg.png', 100),
                                                           ('Fortnite', 'Battle Royale game with various game modes.', 0.00,'', 500),
                                                           ('FIFA 22', 'Football simulation game.', 59.99, '', 200),
                                                           ('Among Us', 'Multiplayer party game of teamwork and betrayal.', 4.99, '',300),
                                                           ('Minecraft', 'Sandbox game that allows players to build with a variety of different blocks.', 26.95, '', 150),
                                                           ('Civilization VI', 'Turn-based strategy game.', 59.99, '',120),
                                                           ('Need for Speed: Heat', 'Racing game set in an open world environment.', 39.99, '',80),
                                                           ('Portal 2', 'First-person puzzle-platform game.', 9.99, 'https://assetsio.reedpopcdn.com/co1rs4.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',90),
                                                           ('Dead Space', 'Survival horror game.', 14.99,'', 70),
                                                           ('Hollow Knight', 'Action-adventure game with a focus on exploration and combat.', 15.99, '',110);

-- Games_Categories
-- Assuming Categories_Id and Games_Id are the corresponding IDs from the Categories and Games tables
INSERT INTO Games_Categories (Categories_Id, Games_Id) VALUES
                                                           (1, 1), (1, 6), (2, 1), (2, 4), (3, 5), (4, 1), (4, 2), (5, 6), (6, 3), (7, 7);

-- Order_Status
INSERT INTO Order_Status (Status) VALUES
                                      ('CREATED'), ('SEND'), ('CANCELLED');

-- Ordered_Games
-- Assuming we have orders with IDs 1 to 10 and games with IDs 1 to 10
INSERT INTO Ordered_Games (Orders_Id, Games_Id, Number_of_Games) VALUES
                                                                     (1, 3, 2), (2, 1, 1), (3, 5, 3), (4, 7, 1), (5, 2, 2), (6, 9, 1), (7, 4, 2), (8, 6, 3), (9, 8, 1), (10, 10, 2);


DELETE FROM ORDERS WHERE 1 = 1;
-- Orders
-- Assuming we have users with IDs 1 to 10 and statuses with IDs 1 to 5
INSERT INTO Orders (Order_Date, Send_Date, Users_Id, Sum, Cancel_Date, Status_Id) VALUES
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 1, 109.98, NULL, 1),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 3, 0.00, NULL, 1),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), strftime('%Y-%m-%d %H:%M:%f', 'now'), 5, 44.97, NULL, 2),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 7, 29.98, NULL, 1),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 2, 9.98, NULL, 1),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 4, 15.98, NULL, 1),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), strftime('%Y-%m-%d %H:%M:%f', 'now'), 6, 29.97, NULL, 2),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 8, 44.97, strftime('%Y-%m-%d %H:%M:%f', 'now'), 3),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 10, 15.98, NULL, 1),
                                                                                      (strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), NULL, 9, 31.98, NULL, 1);


-- Roles
INSERT INTO Roles (Name, Description) VALUES
                                          ('Admin', 'Administrator role with full access.'),
                                          ('User', 'Standard user role with basic access.'),
                                          ('Something', 'Some other role with specific access.');


-- Insert Admin User
INSERT INTO Users (Login, Mail, Create_Date, Roles_Id, Password)
VALUES ('admin', 'admin@test.com', strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), 1, 'admin');

-- Insert Kings User
INSERT INTO Users (Login, Mail, Create_Date, Roles_Id, Password)
VALUES ('kings', 'kings@test.com', strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), 2, '');

-- Insert Noname User
INSERT INTO Users (Login, Mail, Create_Date, Roles_Id, Password)
VALUES ('noname', 'noname@test.com', strftime('%Y-%m-%d %H:%M:%f', '2021-10-23'), 3, '');

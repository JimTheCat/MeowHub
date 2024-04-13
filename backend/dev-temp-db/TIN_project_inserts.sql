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

-- Friends
-- Assuming we have users with IDs 1 to 10
INSERT INTO Friends (User1_Id, User2_Id) VALUES
(1, 2), (1, 3), (2, 3), (4, 5), (6, 7), (8, 9), (9, 10), (10, 7), (5, 3), (4, 6);

-- Games
INSERT INTO Games (Name, Description, Price, Quantity) VALUES
('The Witcher 3: Wild Hunt', 'Open-world action role-playing game.', 49.99, 100),

('Fortnite', 'Battle Royale game with various game modes.', 0.00, 500),

('FIFA 22', 'Football simulation game.', 59.99, 200),

('Among Us', 'Multiplayer party game of teamwork and betrayal.', 4.99, 300),

('Minecraft', 'Sandbox game that allows players to build with a variety of different blocks.', 26.95, 150),

('Civilization VI', 'Turn-based strategy game.', 59.99, 120),

('Need for Speed: Heat', 'Racing game set in an open world environment.', 39.99, 80),

('Portal 2', 'First-person puzzle-platform game.', 9.99, 90),

('Dead Space', 'Survival horror game.', 14.99, 70),

('Hollow Knight', 'Action-adventure game with a focus on exploration and combat.', 15.99, 110);

-- Games_Categories
-- Assuming Categories_Id and Games_Id are the corresponding IDs from the Categories and Games tables
INSERT INTO Games_Categories (Categories_Id, Games_Id) VALUES
(1, 1), (1, 6), (2, 1), (2, 4), (3, 5), (4, 1), (4, 2), (5, 6), (6, 3), (7, 7);

-- Order_Status
INSERT INTO Order_Status (Id, Status) VALUES
(1, 'Pending'), (2, 'Processing'), (3, 'Shipped'), (4, 'Delivered'), (5, 'Cancelled');

-- Ordered_Games
-- Assuming we have orders with IDs 1 to 10 and games with IDs 1 to 10
INSERT INTO Ordered_Games (Orders_Id, Games_Id, Number_of_Games) VALUES
(1, 3, 2), (2, 1, 1), (3, 5, 3), (4, 7, 1), (5, 2, 2), (6, 9, 1), (7, 4, 2), (8, 6, 3), (9, 8, 1), (10, 10, 2);

-- Orders
-- Assuming we have users with IDs 1 to 10 and statuses with IDs 1 to 5
INSERT INTO Orders (Order_Date, Send_Date, Users_Id, Sum, Cancel_Date, Status_Id) VALUES
('2023-12-24', NULL, 1, 109.98, NULL, 4),
('2023-12-25', NULL, 3, 0.00, NULL, 5),
('2023-12-26', '2023-12-27', 5, 44.97, NULL, 3),
('2023-12-27', NULL, 7, 29.98, NULL, 2),
('2023-12-28', NULL, 2, 9.98, NULL, 4),
('2023-12-29', NULL, 4, 15.98, NULL, 1),
('2023-12-30', '2023-12-31', 6, 29.97, NULL, 3),
('2023-12-31', NULL, 8, 44.97, '2024-01-01', 5),
('2024-01-01', NULL, 10, 15.98, NULL, 2),
('2024-01-02', NULL, 9, 31.98, NULL, 4);

-- Roles
INSERT INTO Roles (Id, Name, Description) VALUES
(1, 'Admin', 'Administrator role with full access.'),

(2, 'User', 'Standard user role with basic access.'),

(3, 'Something', 'Some other role with specific access.');

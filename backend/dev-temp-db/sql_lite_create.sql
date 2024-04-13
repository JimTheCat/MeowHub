-- Table: Categories
CREATE TABLE Categories (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL
);

DROP TABLE GAMES;

-- Table: Games
CREATE TABLE Games (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    Image TEXT,
    Quantity INT NOT NULL
);

-- Table: Games_Categories
CREATE TABLE Games_Categories (
    Categories_Id INTEGER NOT NULL,
    Games_Id INTEGER NOT NULL,
    PRIMARY KEY (Categories_Id, Games_Id),
    FOREIGN KEY (Categories_Id) REFERENCES Categories(Id),
    FOREIGN KEY (Games_Id) REFERENCES Games(Id)
);

-- Table: Order_Status
CREATE TABLE Order_Status (
    Id INTEGER PRIMARY KEY,
    Status INTEGER NOT NULL
);

-- Table: Ordered_Games
CREATE TABLE Ordered_Games (
    Id INTEGER PRIMARY KEY,
    Orders_Id INTEGER NOT NULL,
    Games_Id INTEGER NOT NULL,
    Number_of_Games INTEGER NOT NULL DEFAULT 1,
    CHECK (Number_of_Games >= 1),
    FOREIGN KEY (Orders_Id) REFERENCES Orders(Id),
    FOREIGN KEY (Games_Id) REFERENCES Games(Id)
);

DROP table orders;
-- Table: Orders
CREATE TABLE Orders (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Order_Date DATE NOT NULL,
    Send_Date DATE,
    Users_Id INTEGER,
    Sum DECIMAL(20,2),
    Cancel_Date DATE,
    Status_Id INTEGER NOT NULL,
    FOREIGN KEY (Status_Id) REFERENCES Order_Status(Id),
    FOREIGN KEY (Users_Id) REFERENCES Users(Id)
);

-- Table: Roles
CREATE TABLE Roles (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL
);

drop table users;
-- Table: Users
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY,
    Login TEXT NOT NULL,
    Mail TEXT NOT NULL,
    Create_Date DATE NOT NULL,
    Birthdate DATE,
    Is_Locked TEXT,
    Roles_Id INTEGER NOT NULL,
    Password TEXT NOT NULL,
    Salt TEXT,
    Refresh_Token TEXT,
    Expiration_Date DATE,
    UNIQUE (Login),
    CHECK (Is_Locked IN ('T', 'N')),
    FOREIGN KEY (Roles_Id) REFERENCES Roles(Id)
);

-- Foreign keys
CREATE INDEX idx_Friends_User1_Id ON Friends(User1_Id);
CREATE INDEX idx_Friends_User2_Id ON Friends(User2_Id);
CREATE INDEX idx_Orders_Users_Id ON Orders(Users_Id);
CREATE INDEX idx_Orders_Status_Id ON Orders(Status_Id);
CREATE INDEX idx_Games_Categories_Categories_Id ON Games_Categories(Categories_Id);
CREATE INDEX idx_Games_Categories_Games_Id ON Games_Categories(Games_Id);
CREATE INDEX idx_Ordered_Games_Orders_Id ON Ordered_Games(Orders_Id);
CREATE INDEX idx_Ordered_Games_Games_Id ON Ordered_Games(Games_Id);
CREATE INDEX idx_Users_Roles_Id ON Users(Roles_Id);

-- End of file.

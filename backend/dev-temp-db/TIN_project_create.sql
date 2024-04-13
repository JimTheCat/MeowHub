-- Table: Categories
CREATE TABLE Categories (
    Id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(40) NOT NULL,
    Description VARCHAR(100) NOT NULL,
    PRIMARY KEY (Id)
) COMMENT 'Dictionary of Categories';

-- Table: Friends
CREATE TABLE Friends (
    User1_Id INT NOT NULL,
    User2_Id INT NOT NULL,
    PRIMARY KEY (User1_Id, User2_Id),
    FOREIGN KEY (User1_Id) REFERENCES Users(Id),
    FOREIGN KEY (User2_Id) REFERENCES Users(Id)
);

-- Table: Games
CREATE TABLE Games (
    Id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(60) NOT NULL,
    Description VARCHAR(400),
    Price DECIMAL(10,2) NOT NULL,
    Quantity INT NOT NULL,
    PRIMARY KEY (Id),
    INDEX Products_idx_name (Name)
);

-- Table: Games_Categories
CREATE TABLE Games_Categories (
    Categories_Id INT NOT NULL,
    Games_Id INT NOT NULL,
    PRIMARY KEY (Categories_Id, Games_Id),
    FOREIGN KEY (Categories_Id) REFERENCES Categories(Id),
    FOREIGN KEY (Games_Id) REFERENCES Games(Id)
);

-- Table: Order_Status
CREATE TABLE Order_Status (
    Id INT NOT NULL,
    Status INT NOT NULL,
    PRIMARY KEY (Id)
);

-- Table: Ordered_Games
CREATE TABLE Ordered_Games (
    Id INT NOT NULL,
    Orders_Id INT NOT NULL,
    Games_Id INT NOT NULL,
    Number_of_Games INT NOT NULL DEFAULT 1 COMMENT 'Client may want to order more than one piece of a given product',
    CHECK (Number_of_Games >= 1),
    PRIMARY KEY (Id),
    FOREIGN KEY (Orders_Id) REFERENCES Orders(Id),
    FOREIGN KEY (Games_Id) REFERENCES Games(Id)
);

-- Table: Orders
CREATE TABLE Orders (
    Id INT NOT NULL AUTO_INCREMENT,
    Order_Date DATE NOT NULL COMMENT 'Order approval date',
    Send_Date DATE NULL COMMENT 'Order dispatch date',
    Users_Id INT NULL COMMENT 'Ordering person ID - can be empty, assuming the buyer is anonymous',
    Sum DECIMAL(20,2) NULL,
    Cancel_Date DATE NULL COMMENT 'Order cancellation date - if filled, the order has been canceled and, consequently, not fulfilled.',
    Status_Id INT NOT NULL,
    PRIMARY KEY (Id),
    INDEX Orders_idx_order_date (Order_Date),
    INDEX Orders_idx_user_id (Users_Id),
    FOREIGN KEY (Status_Id) REFERENCES Order_Status(Id),
    FOREIGN KEY (Users_Id) REFERENCES Users(Id)
);

-- Table: Roles
CREATE TABLE Roles (
    Id INT NOT NULL COMMENT 'Primary key',
    Name VARCHAR(20) NOT NULL COMMENT 'Role name',
    Description VARCHAR(40) NOT NULL COMMENT 'Role description',
    PRIMARY KEY (Id)
);

-- Table: Users
CREATE TABLE Users (
    Id INT NOT NULL COMMENT 'Primary key',
    Login VARCHAR(40) NOT NULL COMMENT 'User login',
    Mail VARCHAR(20) NOT NULL COMMENT 'User email address',
    Create_Date DATE NOT NULL COMMENT 'User account creation date',
    Birthdate DATE NULL,
    Is_Locked CHAR(1) NULL,
    Roles_Id INT NOT NULL,
    Password VARCHAR(20) NOT NULL,
    Salt VARCHAR(40) NULL,
    Refresh_Token VARCHAR(100) NULL,
    UNIQUE INDEX uq_users_login (Login),
    CHECK (Is_Locked IN ('T', 'N')),
    PRIMARY KEY (Id),
    INDEX Users_idx_1 (Login, Mail),
    INDEX Users_idx_2 (Login),
    INDEX Users_idx_3 (Mail),
    FOREIGN KEY (Roles_Id) REFERENCES Roles(Id)
);

-- Foreign keys
ALTER TABLE Friends
    ADD FOREIGN KEY (User1_Id) REFERENCES Users(Id),
    ADD FOREIGN KEY (User2_Id) REFERENCES Users(Id);

ALTER TABLE Orders
    ADD FOREIGN KEY (Status_Id) REFERENCES Order_Status(Id),
    ADD FOREIGN KEY (Users_Id) REFERENCES Users(Id);

ALTER TABLE Games_Categories
    ADD FOREIGN KEY (Categories_Id) REFERENCES Categories(Id),
    ADD FOREIGN KEY (Games_Id) REFERENCES Games(Id);

ALTER TABLE Users
    ADD FOREIGN KEY (Roles_Id) REFERENCES Roles(Id);

ALTER TABLE Ordered_Games
    ADD FOREIGN KEY (Games_Id) REFERENCES Games(Id),
    ADD FOREIGN KEY (Orders_Id) REFERENCES Orders(Id);

-- End of file.
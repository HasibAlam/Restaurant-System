CREATE DATABASE IF NOT EXISTS swe30003_assignment3;

USE swe30003_assignment3;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type ENUM('Manager', 'Customer', 'FrontStaff', 'KitchenStaff') NOT NULL
);

CREATE TABLE IF NOT EXISTS Reservation (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    num_guests INT NOT NULL,
    confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS MenuItems (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS OrderHistory (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    ordered_items TEXT
);


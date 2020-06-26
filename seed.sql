DROP DATABASE IF EXISTS eTrackerDB;

CREATE DATABASE eTrackerDB;

USE eTrackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

INSERT INTO department(name)
VALUES ("Human Resources"), ("Sales"), ("Engineering"), ("Finance");

INSERT INTO role(title, salary, department_id)
VALUES ("Human Resources", 30000.00, 1), ("Sales Lead", 42000.00, 2), ("Engineer", 55000.00, 3), ("Finance", 38000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Kesler", 2, 4), ("John", "Doe", 2, 1), ("Tom", "Allen", 2, 1), ("Mike", "Allen", 4, 2);
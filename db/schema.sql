CREATE DATABASE employees;

USE employees;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;

CREATE TABLE department
(
    id INTEGER PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)

CREATE TABLE role
(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary decimal NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
)

CREATE TABLE employee
(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
)
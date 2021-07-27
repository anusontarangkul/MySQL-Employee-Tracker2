CREATE DATABASE employees;

USE employees;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;

CREATE TABLE department
(
    id INTEGER NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INTEGER NOT NULL
        AUTO_INCREMENT,
        title VARCHAR
        (30) NOT NULL,
        salary decimal NOT NULL,
        department_id INT,
        FOREIGN KEY
        (department_id) REFERENCES department
        (id) ON
        DELETE CASCADE,
        PRIMARY KEY
        (id)
        );

        CREATE TABLE employee
        (
            id INTEGER NOT NULL
            AUTO_INCREMENT,
            first_name VARCHAR
            (30) NOT NULL,
            last_name VARCHAR
            (30) NOT NULL,
            role_id INT,
            FOREIGN KEY
            (role_id) REFERENCES role
            (id),
            manager_id INT,
            FOREIGN KEY
            (manager_id) REFERENCES employee
            (id) ON
            DELETE CASCADE,
                    PRIMARY KEY
            (id)

            );
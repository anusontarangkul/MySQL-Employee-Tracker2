
INSERT INTO department
    (name)
VALUES
    ('Finance');

INSERT INTO department
    (name)
VALUES
    ('HR');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('analyst' , 60000, 7),
    ('recruiter', 50000, 8),
    ('intern', 10000, 7);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES

    ('Becca', 'Nice', 17, 11);


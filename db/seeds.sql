
INSERT INTO department
    (name)
VALUES
    ('Finance');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('analyst' , 60000, 1);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Ben', 'Sharp', 1, NULL),
    ('Junior', 'test', 1, 1);


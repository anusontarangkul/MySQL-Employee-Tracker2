const inquirer = require('inquirer');
const db = require('./db/database');

const startDirectory = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a role', 'add an employee', 'update an employee role']
        })
        .then(data => {
            const { menu } = data;
            switch (menu) {
                case 'view all departments':
                    viewAllDepartments();
                    break;
                case 'view all roles':
                    viewAllRoles();
                    break;
                case 'view all employees':
                    viewAllEmployees();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateEmployeeRole();
                    break
            }
        })
}

const viewAllDepartments = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startDirectory();
    })
}

const viewAllRoles = () => {
    const sql = 'SELECT * FROM role';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startDirectory();
    })
}
// THEN I am presented with a formatted table showing employee data,  job titles, departments, salaries, and managers that the employees report to
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name," ",manager.last_name) AS manager, role.salary, role.title, department.name AS department
                FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id
                LEFT JOIN department
                ON role.department_id = department.id
                LEFT JOIN employee manager
                ON employee.manager_id = manager.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startDirectory();
    })
}

const addRole = () => { }

const addEmployee = () => { }

const updateEmployeeRole = () => { }


startDirectory()
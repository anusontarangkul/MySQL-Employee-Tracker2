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
    const sql = 'SELECT * FROM department'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startDirectory();
    })
}

const viewAllRoles = () => {
    const sql = 'SELECT * FROM role'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startDirectory();
    })
}

const viewAllEmployees = () => { }

const addRole = () => { }

const addEmployee = () => { }

const updateEmployeeRole = () => { }


startDirectory()
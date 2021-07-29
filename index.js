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
        console.log(result)
        console.table(result);
        startDirectory();
    })
}

function viewAllRoles() {
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
// id, title, salary, department_id

const addRole = () => {
    const sql = 'SELECT * FROM department';
    let roleNameArray = [];
    let allDeptArray = [];
    db.query(sql, (err, result) => {
        if (err) throw err;
        for (let dept of result) {
            roleNameArray.push(dept.name)
            allDeptArray.push(dept)
        }
    })
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'title',
                message: 'What is the title of the role?',
                validate: function (input) {
                    return input ? true : false;
                }
            },
            {
                type: 'text',
                name: 'salary',
                message: 'What is the salary of the role?',
                validate: function (input) {
                    return (!isNaN(input) && input) ? true : false;
                }
            },
            {
                type: 'list',
                name: 'department',
                message: "What is the department of the role?",
                choices: roleNameArray
            }
        ]).then(data => {
            let paramsDeptID = 0
            for (let i = 0; i < allDeptArray.length; i++) {
                if (allDeptArray[i].name === data.department) {
                    paramsDeptID = allDeptArray[i].id;
                }
            }
            const params = [data.title, data.salary, paramsDeptID]
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            db.query(sql, params, function (err, result) {
                if (err) {
                    ressult.status(400).json({ error: err.message });
                    return;
                }
                console.log(data.title + " has been added.")
                startDirectory();
            })
        })
}

async function addEmployee() {
    const allRoles = await findRole_return();
    const allManagers = await findManager_return();
    const allEmployees = await viewAllEmployee_Return();

    let roleArray = []

    for (let role of allRoles) {
        roleArray.push(role.title)
    }


    inquirer
        .prompt([
            {
                type: 'text',
                name: 'first_name',
                message: "What is the employee's first name?",
                validate: function (input) {
                    return input ? true : false;
                }
            },
            {
                type: 'text',
                name: 'last_name',
                message: "What is the employee's last name?",
                validate: function (input) {
                    return input ? true : false;
                }
            },
            {
                type: 'list',
                name: 'managerChoice',
                message: "Who is the manager?",
                choices: allManagers
            },
            {
                type: 'list',
                name: 'roleChoice',
                message: "What is the employee's role?",
                choices: roleArray
            }
        ]).then(data => {
            let paramsRole = 0;
            let paramsManagerID = 0;
            // Looping through roles to match role name with role id
            for (let i = 0; i < allRoles.length; i++) {
                console.log(allRoles[i].title)
                if (allRoles[i].title === data.roleChoice) {
                    paramsRole = allRoles[i].id;
                }
            }

            // Looping through employee to match manager name with mangager id
            for (let i = 0; i < allEmployees.length; i++) {
                if (allEmployees[i].manager === data.managerChoice) {
                    paramsManagerID = allEmployees[i].id;
                }
            }

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?, ?)`;
            const params = [data.first_name, data.last_name, paramsRole, paramsManagerID];
            db.query(sql, params, (err, result) => {
                if (err) {
                    result.status(400).json({ error: err.message });
                    return;
                }
                console.log(`${data.first_name} ${data.last_name} has been added as an employee.`)
                startDirectory();
            })
        })
}




const updateEmployeeRole = async () => {

    // Create array of full names of employees
    const employeeAllArray = await viewEmployee_UpdateRole();

    let employeeChoiceArray = [];
    for (let employee of employeeAllArray) {
        employeeChoiceArray.push(employee.name)
    }

    // Create array of roles
    const roleAllArray = await viewRoles_UpdateRole();
    console.log(roleAllArray)
    let roleChoiceArray = [];
    for (let role of roleAllArray) {
        roleChoiceArray.push(role.title)
    }


    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeChoice',
                message: 'Which employee would you like to update?',
                choices: employeeChoiceArray
            },
            {
                type: 'list',
                name: 'roleChoice',
                message: 'What is the new role?',
                choices: roleChoiceArray
            }
        ]).then(data => {



            // match the role ID with role title
            let roleIdParam;
            for (let role of roleAllArray) {
                if (role.title === data.roleChoice) {
                    roleIdParam = role.id
                }
            }
            let firstNameChoice = data.employeeChoice;
            firstNameChoice = firstNameChoice.split(/(\s+)/);
            firstNameChoice = firstNameChoice[0]

            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`;
            const params = [roleIdParam, firstNameChoice];

            db.query(sql, params, (err, result) => {
                if (err) {
                    result.status(400).json({ error: err.message });
                    return;
                }
                console.log(`${data.employeeChoice} has updated the role to ${data.roleChoice}`)
                startDirectory();
            })
        })
}


const findRole_return = () => {
    return new Promise(resolve => {
        const sql1 = 'SELECT * FROM role';
        db.query(sql1, (err, result) => {
            if (err) throw err;
            resolve(result)
        })
    })
}

const findManager_return = () => {
    return new Promise(resolve => {
        let managerChoice = [];
        let map = {}
        const sql = `SELECT CONCAT(manager.first_name," ",manager.last_name) AS manager
                     FROM employee
                     LEFT JOIN employee manager
                     ON employee.manager_id = manager.id`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            for (let managerObj of result) {
                if (managerObj.manager !== null) {
                    map[managerObj.manager] = true;

                }
            }
            for (let key in map) {
                managerChoice.push(key)

            }
            resolve(managerChoice)

        })
    })
}

const viewAllEmployee_Return = () => {
    return new Promise(resolve => {
        const sql = `SELECT employee.id, CONCAT(manager.first_name," ",manager.last_name) AS manager
                    FROM employee
                    LEFT JOIN employee manager
                    ON employee.manager_id = manager.id`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result)
        })
    })
}

const viewEmployee_UpdateRole = () => {
    return new Promise(resolve => {
        const sql = `SELECT CONCAT(employee.first_name," ",employee.last_name) AS name
                    FROM employee
                    `;
        db.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result)
        })
    })
}

const viewRoles_UpdateRole = () => {
    return new Promise(resolve => {
        const sql = `SELECT id, title
                    FROM role
                    `;
        db.query(sql, (err, result) => {
            if (err) throw err;
            resolve(result)
        })
    })

}

startDirectory();

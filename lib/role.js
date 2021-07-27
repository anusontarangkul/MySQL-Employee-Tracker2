const Department = require('./department')

class Roles extends Department {
    constructor(id, title, salary, department_id) {
        super(department_id);
        this.id = id;
        this.title = title;
        this.salary = salary;
    }
}

module.exports = Roles;
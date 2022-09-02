import Container from '../Container/Container.js';
import Employee from '../Employee/Employee.js';
import Button from '../Button/Button.js';
import EmployeeEdit from '../Employee/EmployeeEdit/EmployeeEdit.js';

class Employees {
    constructor(cabContainer) {
        this.cabContainer = cabContainer;
        this.employee = new Employee(this.cabContainer);
    }
    create(users) {
        const usersContainer = Container.create('users-container');
        users.forEach((userData) => {
            const user = this.employee.create(userData);
            usersContainer.append(user);
        });

        const btnCreateUser = Button.create('users_btn btn', 'Регистрация сотрудника', 'createUserBtn');

        this.cabContainer.append(usersContainer, btnCreateUser);
        this.employee.cabContainer = this.cabContainer;
    }
}

export default Employees;
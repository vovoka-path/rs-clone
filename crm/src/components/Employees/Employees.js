import Container from '../Container/Container.js';
import Employee from '../Employee/Employee.js';
import Button from '../Button/Button.js';
import EmployeeEdit from '../Employee/EmployeeEdit/EmployeeEdit.js';

class Employees {
    constructor(cabContainer, props) {
        this.cabContainer = cabContainer;
        this.employee = new Employee(this.cabContainer, props);
        this.props = props;
    }
    create(users) {
        // console.log('# props.btnCreateUserListener = ', this.props.btnCreateUserListener);
        const usersContainer = Container.create('users-container');
        users.forEach((userData) => {
            const user = this.employee.create(userData);
            usersContainer.append(user);
        });
        const btnCreateUser = Button.create(
            'users_btn btn', 
            'Регистрация сотрудника', 
            'createUserBtn',
            this.props.btnRegistrationUserListener()
        );

        this.cabContainer.append(usersContainer, btnCreateUser);
        this.employee.cabContainer = this.cabContainer;
    }
}

export default Employees;
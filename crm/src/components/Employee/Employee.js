import Button from '../Button/Button.js';
import Header from '../Header/Header.js';
import Container from '../Container/Container.js';
import Paragraph from '../Paragraph/Paragraph.js';
import EmployeeEdit from '../Employee/EmployeeEdit/EmployeeEdit.js';
import EmployeeCreate from './EmployeeCreate/EmployeeCreate.js';

class Employee {
    constructor(cabContainer, props) {
        this.cabContainer = cabContainer;
        this.employeeEdit = new EmployeeEdit(this.cabContainer, props);
        this.employeeCreate = new EmployeeCreate(this.cabContainer, props);
        this.props = props;
    }
    create(user) {
        const niknameTitle = Header.create(3, user.username, 'user_title');
        const userContainer = Container.create('user', niknameTitle);
        const btnContainer = Container.create('user__btn-container');
        const changeBtn = Button.create(
            'userChange-btn btn', 
            'Редактировать', 
            user._id, 
            this.props.btnEditUserListener()
        );
        const deleteBtn = Button.create(
            'userChange-btn btn', 
            'Удалить', 
            user._id, 
            this.props.btnDeleteUserListener()
        );
        // const changeBtn = Button.create('userChange-btn btn', 'Редактировать', 'changeUserBtn', handler);
        // const deleteBtn = Button.create('userChange-btn btn', 'Удалить', 'deleteUserBtn', /* метод для удаления пользователя */);

        for(let prop in user) {
            if (prop === '__v' || prop === 'password' || prop === 'username') continue;
            if (prop === '_id') {
                userContainer.id = user[prop];
                continue;
            }
            const item = Paragraph.create(`user_${prop}`, user[prop]);
            userContainer.append(item);
        }
        btnContainer.append(changeBtn, deleteBtn)
        userContainer.append(btnContainer);
        return userContainer;
    }

    // renderEmployeeEdit() {
    //     this.employee = this.employeeEdit.create(user);
    // }
}

export default Employee;
import Container from "../../Container/Container.js";
import Header from "../../Header/Header.js";
import Label from '../../Label/Label.js';
import Input from '../../Input/Input.js';
import Button from "../../Button/Button.js";

class EmployeeEdit {
    constructor(cabContainer, props) {
        this.cabContainer = cabContainer;
        this.props = props;
        this.create = this.create;
    }
    create(user) {
        this.cabContainer.innerHTML = '';
        const { btnUpdateUserListener } = this.props;

        const userEdit = Container.create('user-edit__container');
        const userEditBtn = Button.create('user-edit__btn', 'Сохранить изменения', user._id, btnUpdateUserListener());
        const labels = ['Имя пользователя', 'Роль', 'E-mail', 'Полное имя'];
        const inputs = ['username', 'role', 'email', 'name'];

        labels.forEach((item, i) => {
            const label = Label.create(`userEdit-${inputs[i]}`, item);
            const input = Input.create(`user-edit__item`, 'text', user[inputs[i]], `userEdit-${inputs[i]}`, user[inputs[i]]);
            label.append(input);

            userEdit.append(label);
        });

        userEdit.append(userEditBtn);

        this.cabContainer.append(userEdit);
    }
}

export default EmployeeEdit;

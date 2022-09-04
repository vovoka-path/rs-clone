import Container from "../../Container/Container.js";
import Label from '../../Label/Label.js';
import Input from '../../Input/Input.js';
import Button from "../../Button/Button.js";
import Select from "../../Select/Select.js";

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
        const labels = ['Имя пользователя', 'Роль', 'status', 'E-mail', 'Полное имя'];
        const inputs = ['username', 'role', 'email', 'status', 'name'];

        labels.forEach((item, i) => {
            if (item === 'Роль') {
                const label = Label.create(`userEdit-${inputs[i]}`, item);
                const input = Select.create(`user-edit__item`,  `userEdit-${inputs[i]}`, ['manager','photographer','editor']);
                label.append(input);
    
                userEdit.append(label);
            } else {
                const label = Label.create(`userEdit-${inputs[i]}`, item);
                const input = Input.create(`user-edit__item`, 'text', user[inputs[i]], `userEdit-${inputs[i]}`, user[inputs[i]]);
                label.append(input);
    
                userEdit.append(label);
            }

        });

        userEdit.append(userEditBtn);

        this.cabContainer.append(userEdit);
    }
}

export default EmployeeEdit;

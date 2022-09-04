import Label from "../../Label/Label.js";
import Input from "../../Input/Input.js";
import Button from "../../Button/Button.js";
import Container from "../../Container/Container.js";
import Select from '../../Select/Select.js';


class EmployeeCreate {
    constructor(cabContainer, props) {
        this.cabContainer = cabContainer;
        this.props = props;
        this.create = this.create;
    }
    create() {
        this.cabContainer.innerHTML = '';
        const { btnCreateUserListener } = this.props; // обновит данные пользователя по id кнопки = 630e16043f4dd1fd2ac94429

        const userCreate = Container.create('user-create__container');
        const userCreateBtn = Button.create('user-create__btn', 'Создать пользователя', 'userCreateBtn', btnCreateUserListener());
        const labels = ['Имя пользователя', 'Пароль', 'Роль', 'E-mail', 'Полное имя'];
        const inputs = ['username', 'password', 'role', 'email', 'name'];

        labels.forEach((item, i) => {
            if (item === 'Роль') {
                const label = Label.create(`userCreate-${inputs[i]}`, item);
                const input = Select.create(`user-create__item`, `userCreate-${inputs[i]}`, ['manager','photographer','editor']);
                label.append(input);
                userCreate.append(label);
            } else {
                const label = Label.create(`userCreate-${inputs[i]}`, item);
                const input = Input.create(`user-create__item`, 'text', '', `userCreate-${inputs[i]}`, item);
                label.append(input);
                userCreate.append(label);
            }
        });

        userCreate.append(userCreateBtn);

        this.cabContainer.append(userCreate);
    }

    // createRegistrationData() {
    //     const userData =  {};
    //     const inputs = ['username', 'password', 'role', 'email', 'name'];
    //     inputs.forEach((el) => {
    //         const curInput = document.querySelector(`#userCreate-${el}`);
    //         userData[el] = curInput.value;
    //     });

    //     console.log(userData);
    // }
}

export default EmployeeCreate;
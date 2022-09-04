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
        // this.cabContainer.innerHTML = 'View EmployeeEdit. USER id = ' + user._id; // заменить на: this.cabContainer.innerHTML = '';
        // console.log('# create(user) = ', user);
        const { btnUpdateUserListener } = this.props; // обновит данные пользователя по id кнопки = 630e16043f4dd1fd2ac94429

        const userEdit = Container.create('user-edit__container');
        const userEditBtn = Button.create('user-edit__btn', 'Сохранить изменения', 'userEditBtn', this.createUpdateData(user));
        const labels = ['Имя пользователя', 'Пароль', 'Роль', 'E-mail', 'Полное имя'];
        const inputs = ['username', 'password', 'role', 'email', 'name'];

        labels.forEach((item, i) => {
            const label = Label.create(`userEdit-${inputs[i]}`, item);
            const input = Input.create(`user-edit__item`, 'text', user[inputs[i]], `userEdit-${inputs[i]}`, user[inputs[i]]);
            label.append(input);

            userEdit.append(label);
        });

        userEdit.append(userEditBtn);

        this.cabContainer.append(userEdit);
    }

    createUpdateData(user) {
        return () => {
            const userData =  {
                _id: user._id,
            };
            const inputs = ['username', 'password', 'role', 'email', 'name'];
            inputs.forEach((el) => {
                const curInput = document.querySelector(`#userEdit-${el}`);
                userData[el] = curInput.value;
            });
    
            console.log(userData);
        }

    }
}

export default EmployeeEdit;

// Нужен метод, который получает данные формы как ты написал в OrderCreate:
// Я его заберу в listeners

// const orderData =  {};
//         const inputs = ['city', 'route', 'package_name', 'clientEmail', 'clientMessage'];
//         const date = Date.now();
//         inputs.forEach((el) => {
//             console.log('# el = ', el);
//             const curInput = document.querySelector(`#${el}`);
//             orderData[el] = curInput.value;
//             curInput.value ='';
//         });
//         orderData.date = {
//             incoming: date,
//         };
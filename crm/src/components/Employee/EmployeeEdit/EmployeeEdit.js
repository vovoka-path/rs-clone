import Container from "../../Container/Container.js";
import Header from "../../Header/Header.js";

class EmployeeEdit {
    constructor(cabContainer, props) {
        this.cabContainer = cabContainer;
        this.props = props;
        this.create = this.create;
    }
    create(user) {
        this.cabContainer.innerHTML = 'View EmployeeEdit. USER id = ' + user._id; // заменить на: this.cabContainer.innerHTML = '';
        // console.log('# create(user) = ', user);
        const { btnUpdateUserListener } = this.props; // обновит данные пользователя по id кнопки = 630e16043f4dd1fd2ac94429
        const userItem = Container.create('user-item__container');
        for(let prop in user){
            const item = Container.create(`user-item__${prop}`, user[prop]);
            userItem.append(item);
        }
        return userItem;
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
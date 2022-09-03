import Input from '../Input/Input.js';
import Label from '../Label/Label.js';
import Button from '../Button/Button.js';
import Container from '../Container/Container.js';
import Textarea from '../Textarea/Textarea.js';
import Select from '../Select/Select.js';

class OrderCreate {
    constructor(cabContainer) {
        this.cabContainer = cabContainer;
    }
    renderCreateView(props){
        const newOrderContainer = Container.create('new-order__container');
        const labels = ['Город', 'Маршрут', 'Пакет', 'Email Клиента', 'Примечания'];
        const inputs = ['city', 'route', 'package_name', 'clientEmail', 'clientMessage'];
        const { btnSendListener } = props;
        const btnSend = Button.create(
            'create-oreder-btn', 
            'Создать заказ', 
            'createOrderBtn', 
            btnSendListener
        );
        let input;
        let label;
        for(let i = 0; i < inputs.length; i++) {
            if (labels[i] === 'Примечания') {
                label = Label.create(inputs[i], labels[i]);
                input = Textarea.create(`order__${inputs[i]}`, `${inputs[i]}`, labels[i]);
            } else if (labels[i] === 'Город') {
                label = Label.create(inputs[i], labels[i]);
                input = Select.create(`order__${inputs[i]}`, `${inputs[i]}`, ['Прага', 'Париж', 'Рим', 'Венеция']);
            } else if (labels[i] === 'Маршрут') {
                label = Label.create(inputs[i], labels[i]);
                input = Select.create(`order__${inputs[i]}`, `${inputs[i]}`, ['Маршрут №1 - Старинная Прага', 'Маршрут №2 - Уютная Прага', 'Маршрут №3 - Сердце Праги']);
            }  else if (labels[i] === 'Пакет') {
                label = Label.create(inputs[i], labels[i]);
                input = Select.create(`order__${inputs[i]}`, `${inputs[i]}`, ['Тариф Мини', 'Тариф Стандарт', 'Тариф Элит']);
            } else {
                label = Label.create(inputs[i], labels[i]);
                input = Input.create(`order__${inputs[i]}`, 'text', '', `${inputs[i]}`, labels[i]);
            }
            label.append(input);
            newOrderContainer.append(label);
        }
        newOrderContainer.append(btnSend)
        this.cabContainer.append(newOrderContainer);
    }
}

export default OrderCreate;
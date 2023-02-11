import statusButtonColor from '../../../data/statusButtonColor.json' assert { type: "json" };
import orderKeysInList from '../../../data/orderKeysInList.json' assert { type: "json" };
import orderKeyTitles from '../../../data/orderKeyTitles.json' assert { type: "json" };
import { isShowOrderKey, getFormattedDate, createCustomElement } from '../../../utils/utils.js';
import Button from '../../Button/Button.js';

// Универсальный список заказов для всех кабинетов
// Зависит от props
class OrderInList {
    constructor() {
        this.buttunText = 'Посмотреть';
    }

    create(props) {
        const { role, roleStatus, orderStatuses, order, orders, orderButtonListener } = props;

        this.orderContainer = createCustomElement('div', 'order-container');
        this.orderContainer.setAttribute('id', order._id);

        this.orderContainer.addEventListener('click', orderButtonListener());

        this.orderItemsContainer = createCustomElement('div', 'order-items-container');

        // Отрисовываем все поля заказа
        const keyAllowedToShow = orderKeysInList[order.status][role];

        for ( let key in order) {
            if (isShowOrderKey(keyAllowedToShow, key)) {
                this.renderOrderKeyElement(props, key);
            }
        }

        this.orderContainer.append(this.orderItemsContainer);
        
        const buttonOrder = this.createButton(order);

        // Вешаем обработчик
        // buttonOrder.addEventListener('click', orderButtonListener());
        
        this.orderContainer.append(buttonOrder);

        return this.orderContainer;
    }

    createButton(order) {
        const buttonOrder = document.createElement('button');
        buttonOrder.className = 'btn-order btn';
        buttonOrder.innerText = this.buttunText;
        // buttonOrder.setAttribute('id', order._id);

        return buttonOrder;
    }

    // Отрисовываем один ключ заказа 
    renderOrderKeyElement(props, key) {
        const { role, roleStatus, orderStatuses, order, users, orderButtonListener, statusButtonListener } = props;
        
        const lang = 'ru';
        const OrderKeyElement = document.createElement('div');
        let orderKey = '';
        let orderValue = '';

        if (key === 'date') {
            const dates = order[key];
            const date = dates[roleStatus];
            orderValue = getFormattedDate(date);
        } else if (key === 'status') {
            orderKey = key;
            orderValue = order[key];
            const backgroundColor = statusButtonColor[orderValue];
            OrderKeyElement.style.backgroundColor = backgroundColor;
        } else if (key === 'photographerId' || key === 'editorId') {
            orderKey = key;
            const [ user ] = users.filter((user) => user._id === order[key]);
            orderValue = `${orderKeyTitles[lang][key]}: ${user.name}`;
        } else {
            orderKey = key;
            orderValue = `${orderKeyTitles[lang][key]}: ${order[key]}`;
        }

        OrderKeyElement.className = `order_item order-item-list list-${key}`;
        OrderKeyElement.innerText = orderValue;

        this.orderItemsContainer.append(OrderKeyElement);
    }
}

export default new OrderInList();
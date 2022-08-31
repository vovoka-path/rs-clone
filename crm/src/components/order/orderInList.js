import forbiddenOrderKeys from '../../data/forbiddenOrderKeys.json' assert { type: "json" };
import { isShowOrderKey, getFormattedDate } from '../../utils/utils.js';

// Универсальный список заказов для всех кабинетов
// Зависит от props
class OrderInList {
    constructor() {
        this.buttunText = 'Посмотреть';
        // TODO: colorStatus перенести в config
        this.statusButtonColor = {
            incoming: 'crimson',
            acceptingPhotographer: 'crimson',
            shooting: 'rgb(233, 233, 96)',
            acceptingEditor: 'crimson',
            editing: 'rgb(233, 233, 96)',
            sending: 'rgb(233, 233, 96)',
            completed: 'rgb(53, 185, 64)',
            canceled: 'rgb(218, 3, 207)',
        }
    }

    create(props) {
        const { role, roleStatus, orderStatuses, order, orderButtonListener } = props;

        const orderContainer = this.createContainer('order-container');
        const orderItemsContainer = this.createContainer('order-items-container');
        
        // Отрисовываем все поля заказа - 
        // TODO: use CONFIG
        for ( let key in order) {
            if ( isShowOrderKey(key, forbiddenOrderKeys[roleStatus][role]) ) {
                orderItemsContainer.append(this.createOrderKeyElement(props, key))
            }
        }

        orderContainer.append(orderItemsContainer);
        
        const buttonOrder = this.createButton(order);

        // Вешаем обработчик
        buttonOrder.addEventListener('click', orderButtonListener());
        
        orderContainer.append(buttonOrder);

        return orderContainer;
    }

    createContainer(className) {
        const orderContainer = document.createElement('div');
        orderContainer.className = className;
        
        return orderContainer;
    }

    createButton(order) {
        const buttonOrder = document.createElement('button');
        buttonOrder.className = 'btn-order';
        buttonOrder.innerText = this.buttunText;
        buttonOrder.setAttribute('id', order._id);

        return buttonOrder;
    }

    // Отрисовываем один ключ заказа 
    // (возможно сделать отдельным общим компонентом для orderInList и orderInCab)
    createOrderKeyElement(props, key) {
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;

        const OrderKeyElement = document.createElement('div');
        let orderKey = '';
        let orderValue = '';

        if (key === 'date') {
            orderKey = key[roleStatus];
            const orderDate = order[key][roleStatus];
            orderValue = getFormattedDate(orderDate);
        } else if (key === 'status') {
            orderKey = key;
            orderValue = order[key];
            const backgroundColor = this.statusButtonColor[orderValue];
            OrderKeyElement.style.backgroundColor = backgroundColor;
        } else {
            orderKey = key;
            orderValue = order[key];
        }

        OrderKeyElement.className = `order_item order-item-list list-${orderKey}`;
        OrderKeyElement.innerText = orderValue;

        return OrderKeyElement;
    }
}

export default new OrderInList();

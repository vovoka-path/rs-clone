import forbiddenOrderKeys from '../../data/forbiddenOrderKeys.json' assert { type: "json" };
import { isShowOrderKey } from '../../utils/utils.js';

// TODO: универсальный для всех кабинетов
class OrderInList {
    constructor() {
        this.order = '';
    }

    // Button 'Посмотреть' = this.order.buttonViewOrder
    render(props) {
        // console.log('# OrderInList: props = ', props);
        const { role, orderStatus, order, orderButtonListener } = props;

        // Если статус в виде массива статусов
        // if (Array.isArray(orderStatus)) {
        //     orderStatus.forEach((status) => {
        //         this.renderOrderElement({ ...props, orderStatus: status });
        //     })
        // } else {
            this.renderOrderElement(props);
        // }

        return this.orderContainer;
    }

    renderOrderElement(props) {
        // console.log('# props = ', props);
        const { role, roleStatus, orderStatuses, order, orderButtonListener } = props;

        this.orderContainer = document.createElement('div');
        this.orderContainer.className = 'order-container';
        this.orderItemsContainer = document.createElement('div');
        this.orderItemsContainer.className = 'order-items-container';
        
        // Отрисовываем все поля заказа
        
        for ( let key in order) {
            if ( isShowOrderKey(key, forbiddenOrderKeys[roleStatus][role]) ) {
                this.renderOrderKeyElement(order, key);
            }
        }

        this.orderContainer.append(this.orderItemsContainer);
        
        const buttonOrder = document.createElement('button');
        buttonOrder.className = 'btn-order';
        buttonOrder.innerText = 'Посмотреть';
        buttonOrder.setAttribute('id', order._id);

        // Вешаем обработчик
        buttonOrder.addEventListener('click', orderButtonListener());
        
        this.order = this.orderContainer.append(buttonOrder);
    }

    // Отрисовываем один ключ заказа
    renderOrderKeyElement(order, key) {
        const OrderKeyElement = document.createElement('div');
        let nameKey = '';
        let dataKey = '';

        if (key === 'date') {
            nameKey = key.incomingOrder;
            const date = new Date(order[key].incomingOrder)
            dataKey = date.toLocaleDateString('ru-RU') + ', ' + date.toTimeString().slice(0, 5);
        } else {
            nameKey = key;
            dataKey = order[key];
        }

        OrderKeyElement.className = `order_item order-item-list list-${nameKey}`;
        OrderKeyElement.innerText = dataKey;

        this.orderItemsContainer.append(OrderKeyElement);
    }
}

export default OrderInList;

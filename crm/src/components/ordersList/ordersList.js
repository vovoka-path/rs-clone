import OrderInList from '../order/orderInList/orderInList.js';
import Paragraph from '../Paragraph/Paragraph.js';
import Button from '../Button/Button.js';

class OrdersList {
    constructor() {
        this.startStatus = 'Входящие';
        // this.header = this.createStatusHeader(this.startStatus);
        this.ordersContainer = this.createOrdersContainer();
    }

    // Заказы в зависимости от роли
    create(props) {
        const { role, roleStatus, orderStatus, order, orders } = props;

        this.removeOrderList();

        // this.ordersContainer.append(this.header);
        this.renderOrdersList(props);

        return this.ordersContainer;
    }
    
    createOrdersContainer() {
        const ordersContainer = document.createElement('div');
        ordersContainer.className = 'orders-container';
        
        return ordersContainer;
    }

    renderOrdersList(props) {
        const { orders } = props;

        if (this.isEmpty(orders)) {
            this.renderEmpty();
        } else {
            // Показываем заказы только c текущим статусом
            orders.forEach((order) => {
                const orderContainer = OrderInList.create({ ...props, order: order });

                this.ordersContainer.append(orderContainer);
            });
        }
    }

    renderEmpty() {
        const content = 'Заказы не найдены!';
        this.ordersContainer.append(Paragraph.create('empty', content));
    }

    isEmpty(orders) {
        return !orders.length;
    }

    removeOrderList() {
        if (this.ordersContainer.innerHTML) {
            this.ordersContainer.innerHTML = '';
        }
    }
}

export default OrdersList;

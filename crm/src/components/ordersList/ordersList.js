import OrderInList from '../order/orderInList.js';

class OrdersList {
    constructor() {
        this.startStatus = 'Входящие';
        this.header = this.createStatusHeader(this.startStatus);
        this.ordersContainer = this.createOrdersContainer();
    }

    // Заказы в зависимости от роли
    create(props) {
        const { role, roleStatus, orderStatus, order, orders, orderButtonListener } = props;

        this.removeOrderList();

        this.ordersContainer.append(this.header);
        this.renderOrdersList(props);

        return this.ordersContainer;
    }
    
    createOrdersContainer() {
        const ordersContainer = document.createElement('div');
        ordersContainer.className = 'orders-container';
        
        return ordersContainer;
    }
    
    createStatusHeader(startStatus) {
        const statusHeader = document.createElement('h3');
        statusHeader.innerText = startStatus;
        
        return statusHeader;
    }

    renderOrdersList(props) {
        const { orders } = props;

        // Показываем заказы только c текущим статусом
        orders.forEach((order) => {
            const orderContainer = OrderInList.create({ ...props, order: order });

            this.ordersContainer.append(orderContainer);
        });
    }

    removeOrderList() {
        if (this.ordersContainer.innerHTML) {
            this.ordersContainer.innerHTML = '';
        }
    }
}

export default OrdersList;

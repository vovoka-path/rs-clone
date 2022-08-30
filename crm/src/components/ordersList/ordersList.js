import OrderInList from '../order/orderInList.js';

class OrdersList {
    constructor() {
        this.header = this.createHeader();
        this.ordersContainer = document.createElement('div');
        this.ordersContainer.className = 'orders-container';
    }

    // В зависимости от роли показываются только разрешенные данные заказа
    render(props) {
        const { role, roleStatus, orderStatus, order, orders, orderButtonListener } = props;
        // console.log('# class OrdersList: orders = ', orders);

        if (this.ordersContainer.innerHTML) {
            this.ordersContainer.innerHTML = '';
        }

        this.ordersContainer.append(this.header);

        // const container = document.createElement('div');
        // container.className = 'order-container';

        orders.forEach((order) => {
            // Показываем заказы только c текущим статусом
            const orderContainer = 
                new OrderInList()
                    .render({ ...props, order: order });

            orderContainer.className = 'order-container';
            this.ordersContainer.append(orderContainer);
        });

        return this.ordersContainer;
    }

    removeOrderList() {
        this.ordersContainer.innerHTML = '';
    }

    createHeader() {
        const header = document.createElement('h3');
        header.innerText = 'incoming';

        return header;
    }
}

export default OrdersList;

// ------------------------- archive -----------------------------
 
    // render({status}) {
    //     // const { status } = startPageData;
    //     this.renderOrderList([]);
    //     const container = document.createElement('div');

    //     this.header.innerText = status;

    //     container.append(this.header);
    //     // console.log('# this.list = ', this.list);
    //     container.append(this.ordersContainer);
        
    //     // create order elements
    //     // create order elements
    //     // create order elements
    //     // create order elements
    //     return container;
    // }
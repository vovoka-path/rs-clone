import forbiddenOrderKeys from '../../data/forbiddenOrderKeys.json' assert { type: "json" };
import { isShowOrderKey } from '../../utils/utils.js';

// View одного заказа в любом кабинете
class OrderInCab {
    constructor() {
        this.header = this.createHeader();
    }

    render(props) {
        const { role, roleStatus, orderStatuses, order, orders, orderButtonListener } = props;

        this.orderCabContainer = document.createElement('div');
        this.orderCabContainer.className = 'order-cab-container'
        this.orderData = document.createElement('div');
        this.orderData.className = 'order-data';
        
        // Отрисовываем все поля заказа
        for ( let key in order) {
            // console.log('# roleStatus = ', roleStatus, 'role =', role);
            if ( isShowOrderKey(key, forbiddenOrderKeys[roleStatus][role]) ) {
                // console.log('# key = ', key, order[key], isShowOrderKey(key, forbiddenOrderKeys[orderStatus][role]));
                this.renderOrderKeyElement(order, key);
            }
        }

        this.orderCabContainer.append(this.orderData);

        return this.orderCabContainer;
    }

    // Один ключ заказа
    renderOrderKeyElement(order, key) {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerText = order[key];
        this.orderData.append(orderItem);
        if (key === 'email') {
            const btn = document.createElement('button');
            btn.innerText = key;
            this.orderData.append(btn);
        }
    }

    createHeader() {
        const header = document.createElement('h3');
        // header.innerText = 'incoming';

        return header;
    }

    createList() {
        const list = document.createElement('h3');
        // header.innerText = 'incoming';

        return list;
    }
}

export default OrderInCab;
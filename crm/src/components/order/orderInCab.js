import forbiddenOrderKeys from '../../data/forbiddenOrderKeys.json' assert { type: "json" };
import { isShowOrderKey, getFormattedDate } from '../../utils/utils.js';

// View заказа когда зашел в заказ (в любом кабинете)
class OrderInCab {
    render(props) {
        const { role, roleStatus, orderStatuses, order, orders, orderButtonListener, statusButtonListener } = props;

        this.orderCabContainer = document.createElement('div');
        this.orderCabContainer.className = 'order-cab-container'
        this.orderData = document.createElement('div');
        this.orderData.className = 'order-data';
        
        // Отрисовываем все поля заказа
        for ( let key in order) {
            if ( isShowOrderKey(key, forbiddenOrderKeys[roleStatus][role]) ) {
                this.renderOrderKeyElement(props, key);
            }
        }

        this.orderCabContainer.append(this.orderData);

        return this.orderCabContainer;
    }

    // Один ключ заказа
    renderOrderKeyElement(props, key) {
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;

        const orderItem = document.createElement('div');

        let orderKey = '';
        let orderValue = '';

        if (key === 'date') {
            orderKey = key[roleStatus];
            const orderDate = order[key][roleStatus];
            orderValue = getFormattedDate(orderDate);
        } else {
            orderKey = key;
            orderValue = order[key];
        }

        orderItem.className = `order-item order-item-cab cab-${orderKey}`;
        orderItem.innerText = orderValue;
        this.orderData.append(orderItem);
        if (key === 'email') {
            const btn = document.createElement('button');
            btn.innerText = key;
            this.orderData.append(btn);
        }
    }
}

export default OrderInCab;

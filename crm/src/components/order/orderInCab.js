import statusButtonColor from '../../data/statusButtonColor.json' assert { type: "json" };
import orderKeyTitles from '../../data/orderKeyTitles.json' assert { type: "json" };
import cabViews from '../../data/cabViews.json' assert { type: "json" };
import { isShowOrderKey, getFormattedDate, createCustomElement } from '../../utils/utils.js';

// View заказа когда зашел в заказ (в любом кабинете)
class OrderInCab {
    constructor() {
    }

    render(props) {
        const { role, roleStatus, orderStatuses, order, orders, orderButtonListener, statusButtonListener } = props;

        this.orderCabContainer = createCustomElement('div', 'order-cab-container');
        this.orderItemsContainer = createCustomElement('div', 'order-cab-items-container');
        
        // console.log('# order = ', order);
        // Отрисовываем все поля заказа
        for ( let key in order) {
            if (isShowOrderKey(role, order.status, key)) {
                this.renderOrderKeyElement(props, key);
            }
        }

        this.orderCabContainer.append(this.orderItemsContainer);

        return this.orderCabContainer;
    }

    // Один ключ заказа
    renderOrderKeyElement(props, key) {
        const { role, roleStatus, orderStatuses, order, users, orderButtonListener, statusButtonListener } = props;
        
        const lang = 'ru';
        this.orderKeyElement = document.createElement('div');
        let orderKey = '';
        let orderValue = '';

        if (key === 'date') {
            const dates = order[key];
            const datesKeys = cabViews[role][roleStatus].dates;
            // console.log('# datesKeys = ', datesKeys);
            
            orderValue = datesKeys.map((dateKey) => {
                const date = dates[dateKey];
                return `${orderKeyTitles.ru.date[dateKey]}: ${getFormattedDate(date)}`;
            });
        } else if (key === 'status') {
            orderKey = key;
            orderValue = order[key];
            const backgroundColor = statusButtonColor[orderValue];
            this.orderKeyElement.style.backgroundColor = backgroundColor;
        } else if (key === 'photographerId' || key === 'editorId') {
            orderKey = key;
            const [ user ] = users.filter((user) => user._id === order[key]);
            orderValue = `${orderKeyTitles[lang][key]}: ${user.name}`;
        } else {
            orderKey = key;
            orderValue = `${orderKeyTitles[lang][key]}: ${order[key]}`;
        }

        if (Array.isArray(orderValue)) {
            orderValue.forEach((value) => {
                const orderKeyElement = createCustomElement('div', `order_item order-item-cab cab-${key}`);
                // OrderDateKeyElement.className = `order_item order-item-list list-${key}`;
                orderKeyElement.innerText = value;

                this.orderItemsContainer.append(orderKeyElement);
            });
        } else if (key === 'clientEmail') {
            const email = order[key];
            const btn = createCustomElement('input', 'order-email-button');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', email);
            btn.setAttribute('onclick', `window.location.assign("mailto:${email}");`);
            this.orderKeyElement.append(btn);
        } else {
            this.orderKeyElement.className = `order_item order-item-cab cab-${key}`;
            this.orderKeyElement.innerText = orderValue;
        }
        
        this.orderItemsContainer.append(this.orderKeyElement);
    }
}

export default OrderInCab;

// renderOrderKeyElement(props, key) {
//     const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;

//     const orderItem = document.createElement('div');

//     let orderKey = '';
//     let orderValue = '';

//     if (key === 'date') {
//         orderKey = key[roleStatus];
//         const orderDate = order[key][roleStatus];
//         orderValue = getFormattedDate(orderDate);
//     } else {
//         orderKey = key;
//         orderValue = order[key];
//     }

//     orderItem.className = `order-item order-item-cab cab-${orderKey}`;
//     orderItem.innerText = orderValue;
//     this.orderData.append(orderItem);
//     if (key === 'email') {
//         const btn = document.createElement('button');
//         btn.innerText = key;
//         this.orderData.append(btn);
//     }
// }
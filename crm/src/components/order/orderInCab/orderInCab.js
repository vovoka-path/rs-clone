
import orderKeysInCab from '../../../data/orderKeysInCab.json' assert { type: "json" };
import statusButtonColor from '../../../data/statusButtonColor.json' assert { type: "json" };
import orderKeyTitles from '../../../data/orderKeyTitles.json' assert { type: "json" };
import cabViews from '../../../data/cabViews.json' assert { type: "json" };
import { isShowOrderKey, getFormattedDate, createCustomElement } from '../../../utils/utils.js';

// View заказа когда зашел в заказ (в любом кабинете)
class OrderInCab {
    constructor() {
    }

    render(props) {
        const { role, roleStatus, orderStatuses, order, orders, orderButtonListener, statusButtonListener } = props;

        this.orderCabContainer = createCustomElement('div', 'order-cab-container');
        this.orderItemsContainer = createCustomElement('div', 'order-cab-items-container');
        
        // Отрисовываем все поля заказа
        const keyAllowedToShow = orderKeysInCab[order.status][role];

        for ( let key in order) {

            if (isShowOrderKey(keyAllowedToShow, key)) {
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
                return `<span>${orderKeyTitles.ru.date[dateKey]}:</span> ${getFormattedDate(date)}`;
            });
        } else if (key === 'status') {
            orderKey = key;
            orderValue = order[key];
            const backgroundColor = statusButtonColor[orderValue];
            this.orderKeyElement.style.backgroundColor = backgroundColor;
        } else if (key === 'photographerId' || key === 'editorId') {
            orderKey = key;
            const [ user ] = users.filter((user) => user._id === order[key]);
            console.log('# key, users = ', key, users);
            orderValue = `<span>${orderKeyTitles[lang][key]}</span>: ${user.name}`;
        } else {
            orderKey = key;
            orderValue = `<span>${orderKeyTitles[lang][key]}</span>: ${order[key]}`;
        }

        if (Array.isArray(orderValue)) {
            orderValue.forEach((value) => {
                const orderKeyElement = createCustomElement('div', `order_item order-item-cab cab-${key}`);
                // OrderDateKeyElement.className = `order_item order-item-list list-${key}`;
                orderKeyElement.innerHTML = value; // Заменил innerText на innerHTML для того чтоб использовать теги в шаблонной строке

                this.orderItemsContainer.append(orderKeyElement);
            });
        } else if (key === 'clientEmail') {
            const email = order[key];
            const btn = createCustomElement('input', 'order-email-button btn');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', email);
            btn.setAttribute('onclick', `window.location.assign("mailto:${email}");`);
            this.orderKeyElement.append(btn);
        } else {
            this.orderKeyElement.className = `order_item order-item-cab cab-${key}`;
            this.orderKeyElement.innerHTML = orderValue; // Заменил innerText на innerHTML для того чтоб использовать теги в шаблонной строке
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
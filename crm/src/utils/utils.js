import cabViews from '../data/cabViews.json' assert { type: "json" };
import orderKeysInList from '../data/orderKeysInList.json' assert { type: "json" };
import orderKeysInCab from '../data/orderKeysInCab.json' assert { type: "json" };

export const createCustomElement = (tag = 'div', styles) => {
    // styles = 'class1 class2 class3'
    const element = document.createElement(tag);

    if (styles) element.className = styles;
    
    return element;
}

export const setAttributesElement = (element, attributes) => {
    // attributes = {attribute: value, ...}
    for (const [ key, value ] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
}

// Определяет какие ключи заказа показывать для каждой роли + статуса
export const isShowOrderKey = (keyAllowedToShow, key) => {
    if ( keyAllowedToShow.length !== 0 ) {
        if ( (keyAllowedToShow.includes(key)) ) {
            return true;
        }
    }

    return false;
}

// export const isShowOrderKey = (key, forbiddenOrderKeys) => {
//     if ( forbiddenOrderKeys.length != 0 ) {
//         if ( (forbiddenOrderKeys.includes(key)) ) {
//             return false;
//         }
//     }

//     return true;
// }
// DELETE
export const getStatuses = (role, roleStatus) => {
    const statuses = cabViews[role][roleStatus].statusesForOrders;

    return statuses;
}

// DELETE
export const getOrdersByStatuses = (allOrders, statuses) => {
    let orders = [];

    statuses.forEach((status) => {
        orders = [...orders, ...filterOrdersByStatus(allOrders, status)];
    })

    return orders;
}

export const filterOrdersByStatus = (orders, status) => {
    const filteredOrders = [];

    orders.forEach((order) => {
        // Получаем заказы только c текущим статусом
        if (order.status === status) {
            filteredOrders.push(order);
        }
    });

    return filteredOrders;
}

export const getFormattedDate = (dateString) => {
    const statusDate = new Date(dateString);
    const localStatusDate = statusDate.toLocaleDateString('ru-RU');
    const statusTime = statusDate.toTimeString().slice(0, 5);
    const orderValue = `${localStatusDate}, ${statusTime}`;

    return orderValue;
}

export function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));    
    return date;
}

export const createOrder = () => {
    const routes = ['Маршрут №1 - Старинная Прага', 'Маршрут №2 - Уютная Прага', 'Маршрут №3 - Сердце Праги', 'Маршрут №1 - Старинная Прага', 'Маршрут №2 - Уютная Прага', 'Маршрут №3 - Сердце Праги','Маршрут №1 - Старинная Прага', 'Маршрут №2 - Уютная Прага', 'Маршрут №3 - Сердце Праги'];
    const packeges = ['Тариф Мини', 'Тариф Стандарт', 'Тариф Элит', 'Тариф Мини', 'Тариф Стандарт', 'Тариф Элит', 'Тариф Мини', 'Тариф Стандарт', 'Тариф Элит'];
    const photographers = ['Андрей Фомин', 'Вася Пупкин', 'Александр Кузьмин', 'Валерий Миладзе','Андрей Фомин', 'Вася Пупкин','Валерий Миладзе','Андрей Фомин', 'Вася Пупкин', 'Александр Кузьмин'];

    const date = {
        incoming : randomDate(new Date(2020, 0, 0), new Date(2022,8,0)),
    };  
    date['acceptingPhotographer'] = randomDate(date.incoming, new Date(date.incoming).setHours(date.incoming.getHours() + Math.floor(Math.random() * 5)));
    date['shooting'] = randomDate(date.acceptingPhotographer, new Date(date.acceptingPhotographer).setDate(date.acceptingPhotographer.getDate() + Math.floor(Math.random() * 3 + 1)));
    date['acceptingEditor'] = randomDate(date.shooting, new Date(date.shooting).setHours(date.shooting.getHours() + Math.floor(Math.random() * 5)));
    date['editing'] = randomDate(date.acceptingEditor, new Date(date.acceptingEditor).setDate(date.acceptingEditor.getDate() + Math.floor(Math.random() * 3 + 1)));
    date['sending'] = randomDate(date.editing, new Date(date.editing).setDate(date.editing.getDate() + Math.floor(Math.random() * 3 + 1)));
    date['completed'] = randomDate(date.sending, new Date(date.sending).setDate(date.sending.getDate() + Math.floor(Math.random() * 3 + 1)));
    date['canceled'] = (Math.random() * 10) > 3 ? randomDate(date.incoming, new Date(date.incoming).setDate(date.incoming.getDate() + 3)) : null;

    const order = {
        city: 'Прага',
        route: routes[Math.floor(Math.random() * Math.random() * 9)],
        packege_name: packeges[Math.floor(Math.random() * Math.random() * 9)],
        photographer: photographers[Math.floor(Math.random() * Math.random() * 9)],
        date: date,
    };

    return order;
}

export const createOrders = (counts) => {
    const orders = [];
    for(let i = 0; i < counts; i++){
        orders.push(createOrder());
     }
     return orders;
}
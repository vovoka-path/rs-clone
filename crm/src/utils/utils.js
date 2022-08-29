import cabViews from '../data/cabViews.json' assert { type: "json" };

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
export const isShowOrderKey = (key, forbiddenOrderKeys) => {
    if ( forbiddenOrderKeys.length != 0 ) {
        if ( (forbiddenOrderKeys.includes(key)) ) {
            return false;
        }
    }

    return true;
}

export const getStatuses = (role, roleStatus) => {
    const statuses = cabViews[role][roleStatus].statusesForOrders;

    return statuses;
}

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

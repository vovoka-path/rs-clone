import cabViews from '../data/cabViews.json' assert { type: "json" };
import orderKeysInList from '../data/orderKeysInList.json' assert { type: "json" };
import orderKeysInCab from '../data/orderKeysInCab.json' assert { type: "json" };


export const getFormattedDate = (dateString) => {
    const statusDate = new Date(dateString);
    const localStatusDate = statusDate.toLocaleDateString('ru-RU');
    const statusTime = statusDate.toTimeString().slice(0, 5);
    const orderValue = `${localStatusDate}, ${statusTime}`;

    return orderValue;
}

export const timeMethods = {
    notAcceptingDuration: (role, dates) => {
        let duration = 0;
        if (role === 'photographer') {
            duration = Date.now() - new Date(dates.acceptingPhotographer);
        } else if (role === 'editor') {
            duration = Date.now() - new Date(dates.acceptingEditor);
        }

        let time = parseMillisecondsIntoReadableTime(duration);
        
        return time;
    },
    accepted: (role, dates) => {
        if (role === 'photographer') {
            return getFormattedDate(dates.shooting)
        } else if (role === 'editor') {
            return getFormattedDate(dates.editing)
        }
        return 'недавно';
    },
    acceptingDuration: (role, dates) => {
        let duration = 0;
        if (role === 'photographer') {
            duration = new Date(dates.shooting) - new Date(dates.acceptingPhotographer);
        } else if (role === 'editor') {
            duration = new Date(dates.editing) - new Date(dates.acceptingEditor);
        }

        let time = parseMillisecondsIntoReadableTime(duration);
        
        return time;
    },
    workingDuration: (role, dates) => {
        let duration = 0;
        if (role === 'photographer') {
            duration = new Date(dates.acceptingEditor) - new Date(dates.shooting);
        } else if (role === 'editor') {
            duration = new Date(dates.sending) - new Date(dates.editing);
        }

        let time = parseMillisecondsIntoReadableTime(duration);
        
        return time;
    },
}

function parseMillisecondsIntoReadableTime(milliseconds){
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours;
    // var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes;
    // var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
    // var seconds = (minutes - absoluteMinutes) * 60;
    // var absoluteSeconds = Math.floor(seconds);
    // var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
    
    let textH = ' часов ';

    switch (h.toString().slice(-1)) {
        case '1': 
            textH = h + ' час ';
            break;
        default: 
            textH = h + ' часов ';
            break;
    }

    let textM = ' минут';

    switch (m.toString().slice(-1)) {
        case '1': 
            textM = h === 0 ? ' минуты' : m + ' минуты';
            break;
        default: 
            textM = m + ' минут';
            break;
    }

    let res = ' минуты';
    
    if (h === 0) {
        textH = '';
    }
    
    if (m === 0 && h !== 0) {
        textM = '';
    }

    if ( (h + m) !== 0 ) {
        res = textH + textM;
    } 

    return res;
}

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


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

const parseMillisecondsIntoReadableTime = (milliseconds) => {
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

export function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));    
    return date;
}

export const createOrder = () => {
    const routes = ['№1 - Старинная Прага','№2 - Уютная Прага', '№3 - Сердце Праги', '№1 - Старинная Прага','№2 - Уютная Прага','№3 - Сердце Праги', '№2 - Уютная Прага'];
    const packeges = ['Мини (1 ч · 25 фото · 70€)', 'Стандарт (1,5 ч · 50 фото · 100€)', 'Элит (2,5 ч · 100 фото · 160€)', 'Мини (1 ч · 25 фото · 70€)', 'Стандарт (1,5 ч · 50 фото · 100€)', 'Мини (1 ч · 25 фото · 70€)', 'Стандарт (1,5 ч · 50 фото · 100€)', 'Элит (2,5 ч · 100 фото · 160€)'];
    const photographers = ['Александр Иванов', 'Егор Мальцев', 'Александр Кузьмин', 'Валерий Миладзе', 'Александр Иванов', 'Егор Мальцев','Александр Иванов', 'Егор Мальцев', 'Александр Кузьмин', 'Валерий Миладзе'];

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
        route: routes[Math.floor(Math.random() * Math.random() * 7)],
        packege_name: packeges[Math.floor(Math.random() * Math.random() * 8)],
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

import domen from '../data/domen.json' assert { type: "json" };
import routes from '../data/routes.json' assert { type: "json" };
import cabViews from '../data/cabViews.json' assert { type: "json" };
import menuData from '../data/menuData.json' assert { type: "json" };

// Меню кабинета (by statusRole)
// Создание props (listeners)
class Router {
    constructor() {
        this.domen = domen.url;
        this._routes = [];
    }

    // метод проходится по массиву routes и создает объект на каждый маршрут
    init(role) {
        // Получаем все роуты текущего кабинета
        const cabRoutes = routes[role];

        for(let route in cabRoutes) {
            // получаем текущий статус заказов для отображения
            let roleStatus = cabRoutes[route].status;

            // регулярное выражение с которым будет сопоставляться ссылка
            // ее надо преобразовать из формата :tag в RegEx
            // модификатор g обязателен
            const pattern = new RegExp('^' + route.replace(/:\w+/g,'(\\w+)') + '$');
            // console.log('# route = ', route, pattern);
            
            // console.log('# roleStatus = ', roleStatus);

            // добавляем в массив роутов объект
            this._routes.push({
                pattern: pattern,
                callback: () => this.handleMenuClick(roleStatus),
                // callback: this[method],
            });
        }
    }

    // Установка обработчиков клика в меню
    routingMenu(role) {
        this.init(role);

        // обработчик нажатий на ссылки
        // console.log('# this = ', this);
        
        let handler = event =>  {
            // this = Listeners
            event.preventDefault();
            // console.log('# event.target.href = ', event.target.href);
            // console.log('# this.controller.view.cab.menu.container = ', this.controller.view.cab.menu.container.classList.remove('menu-toggle'));
   
            this.controller.view.cab.menu.container.classList.remove('menu-toggle');

            let url = new URL(this.domen + event.currentTarget.getAttribute('path'));
            // let url = new URL(event.target.href); // 'menu-item-a'
            
            // запускаем роутер, предавая ему path
            this.dispatch(url.pathname);

            // заголовок DELETE ?
            const path = '/' + url.pathname.split('/')[1] + '/' + url.pathname.split('/')[2];
            // console.log('# path = ', path);
            const roleStatus = routes[role][path].status;
            const orderStatus = cabViews[role][roleStatus].statusesForOrders[0];
            // console.log('# role = ', role);
            // console.log('# roleStatus = ', roleStatus);
            // console.log('# menuData = ', menuData);
            console.log(`# menuData[${role}][${orderStatus}] = `, menuData[role][orderStatus]);
            this.controller.view.cab.ordersList.header.innerText = menuData[role][orderStatus].ru;
            // view.cab.ordersList.header.innerText = url.pathname.split('/')[2];
            
            return false;
        }

        // получаем все ссылки на странице
        let anchors = document.getElementsByName('menu-item-li'); 
        
        // вешаем на событие click обработчик
        for( let anchor of anchors ) {
            anchor.addEventListener('click', handler);
        }
    }

    handleStatusButtonClick(path) {
        // запускаем роутер, предавая ему path
        this.dispatch(path);

        // заголовок DELETE ?
        const role = this.controller.model.auth.role;

        const roleStatus = routes[role][path].status;
        this.controller.view.cab.ordersList.header.innerText = menuData[role][roleStatus].ru;

        return false;
    }
    
    dispatch(path) {
        this._routes.forEach((route) => {
            // смотрим есть ли маршруты
            const paths = path.match(route.pattern);

            // если машруты найдены
            // вызываем обработчик из объекта, передавая ему маршруты
            // paths.slice(1) отрезает всю найденную строку
            // console.log('# route.pattern = ', route.pattern);
            if (paths) {
                // console.log('# this = ', this);
                // console.log('# paths = ', paths);
                // console.log('# paths.slice(1) = ', paths.slice(1));
                // const correctPath = paths[0].slice(1);
                // route.callback.apply(this, correctPath);
                // route.callback.apply(this, paths.slice(1));
                route.callback.apply(this);
            }
        })
    }
} 

export default Router;

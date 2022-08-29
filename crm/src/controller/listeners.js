import Router from './router.js';
import { getStatuses, getOrdersByStatuses } from '../utils/utils.js';

class Listeners extends Router{
    constructor() {
        super();
    }
    
    bindHandlers(controller) {
        this.controller = controller;
        this.orderButtonListener = this.orderButtonListenerNotBind.bind(this.controller);
        // this.orderButtonListener.bind(this.controller)
        this.statusButtonListener = this.statusButtonListenerNotBind.bind(this.controller)
        // this.statusButtonListener.bind(this.controller)
    }

    async signIn() {
        const view = this.controller.view;

        view.signIn.button.addEventListener('click', async event => {
            event.preventDefault();
            
            const formData = {
                username: view.signIn.login.value,
                password: view.signIn.password.value,
            }
            
            const json = await this.controller.getRole(formData);
            const { role } = json;

            // const startStatus = this.controller.model.startStatuses[role];
            const roleStatus = 'incoming';

            const props = await this.createProps(roleStatus);
            
            // Рисуем кабинет со списком входящих заказов
            this.controller.view.renderCab(props);
            // Вешаем на меню обработчики
            this.routingMenu(role);
        }, true);
    }

    // обработчик кликов по меню
    async handleMenuClick(roleStatus) {
        // console.log('# handleMenuClick: roleStatus= ', roleStatus);

        const props = await this.createProps(roleStatus);
        this.controller.view.cab.renderOrderList(props);
    }

    async createProps(roleStatus) {
        // Запоминаем текущий статус работника в model - надо ли?
        this.controller.model.roleStatus = roleStatus;
           
        // TODO?: get orders depend on defaultStatus
        const allOrders = await this.controller.getOrderData();
       //  console.log('# allOrders = ', allOrders);
        const role = this.controller.model.auth.role;
        const orderStatuses = getStatuses(role, roleStatus);
        const orders = getOrdersByStatuses(allOrders, orderStatuses);
        
        const props = {
            role: role,
            roleStatus: roleStatus,
            orderStatuses: orderStatuses,
            order: {},
            orders: orders,
            orderButtonListener: this.orderButtonListener,
            statusButtonListener: null, // добавляем после входа в конкретный заказ
        };

        return props;
   }

    // обработчик кнопки списка заказов "Посмотреть заказ"
    orderButtonListenerNotBind() {
        // показать M2: Входящий заказ (один)
        return (event) => {
            // this = controller
            console.log('# orderButtonListener: this = ', this);
            const orderId = event.target.id;
            const role = this.model.auth.role;
            const roleStatus = this.model.roleStatus;

            const statuses = getStatuses(role, roleStatus);

            const orders = this.model.orders;
            
            const [ currentOrder ] = orders.filter((order) => {
                return order._id === orderId;
            });

            console.log('# this.listeners.statusButtonListener = ', this.listeners.statusButtonListener);
            const props = {
                role: role,
                roleStatus: roleStatus,
                orderStatuses: statuses,
                order: currentOrder,
                orders: orders,
                // orderButtonListener: this.orderButtonListener,
                statusButtonListener: this.listeners.statusButtonListener,
            }
            
            this.view.cab.cabContainer.innerHTML = '';
            this.view.cab.renderStatusView(props);
        }
    }
    
    statusButtonListenerNotBind() {
        // statusButtonListener() {
        return (event) => {
            console.log('# statusButtonListener worked! this = ', this)
            console.log('# event = ', event);
        }
    }
}

export default Listeners;

import Router from './router.js';
import cabViews from '../data/cabViews.json' assert { type: "json" };
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
        console.log('# allOrders = ', allOrders);
        const role = this.controller.model.auth.role;

        const orderStatuses = getStatuses(role, roleStatus);
        this.controller.model.orderStatuses = orderStatuses;

        const orders = getOrdersByStatuses(allOrders, orderStatuses);

        const users = (role === 'manager') ? await this.controller.getAllUsers() : [];
        
        const props = {
            role: role,
            roleStatus: roleStatus,
            orderStatuses: orderStatuses,
            order: {},
            orders: orders,
            users: users,
            orderButtonListener: this.orderButtonListener,
            statusButtonListener: null, // добавляем после входа в конкретный заказ
        };

        console.log('# props = ', props);

        return props;
   }

    // обработчик кнопки списка заказов "Посмотреть заказ"
    orderButtonListenerNotBind() {
        // показать M2: Входящий заказ (один)
        return (event) => {
            // this = controller
            // console.log('# orderButtonListener: this = ', this);
            // if (event.currentTarget)
            const orderId = event.target.id;
            this.model.orderId = orderId;

            const role = this.model.auth.role;
            const roleStatus = this.model.roleStatus;

            const orderStatuses = getStatuses(role, roleStatus);
            this.model.orderStatuses = orderStatuses;

            const orders = this.model.orders;
            
            const [ currentOrder ] = orders.filter((order) => {
                return order._id === orderId;
            });

            const users = this.model.users;

            // console.log('# this.listeners.statusButtonListener = ', this.listeners.statusButtonListener);
            const props = {
                role: role,
                roleStatus: roleStatus,
                orderStatuses: orderStatuses,
                order: currentOrder,
                orders: orders,
                users: users,
                // orderButtonListener: this.orderButtonListener,
                statusButtonListener: this.listeners.statusButtonListener,
            }
            
            this.view.cab.cabContainer.innerHTML = '';
            this.view.cab.renderStatusView(props);
        }
    }
    
    // statusButtonListener() {
    statusButtonListenerNotBind() {
        return async (event) => {
            const action = event.target.getAttribute('action');
            const orderId = this.model.orderId;
            const role = this.model.auth.role;
            const roleStatus = this.model.roleStatus;
            const orderStatus = this.model.orderStatuses[0];
            
            // console.log('# orderId = ', orderId);
            // console.log('# action = ', action);
            // console.log('# orderStatus = ', orderStatus);
            // console.log('# role = ', role);
            // console.log('# roleStatus = ', roleStatus);
            const newRoleStatus = cabViews[role][roleStatus].statusButtonText[action].newStatus;
            // console.log('# newRoleStatus = ', newRoleStatus);
            this.model.roleStatus = newRoleStatus;
            
            const newOrderStatus = cabViews[role][newRoleStatus].statusesForOrders[0];
            this.model.orderStatuses = newOrderStatus
            // console.log('# this.model.orderStatuses = ', this.model.orderStatuses);

            // TODO: UPDATE ORDER STATUS API
            // TODO: Сделать запись в поле photographerId
            // console.log('# event.target.parentElement = ', event.target.parentElement);
            // console.log('# event.currentTarget = ', event.currentTarget);
            const photographerId = event.target.parentElement.getAttribute('id');

            const dataOrder = {
                _id: orderId,
                status: newOrderStatus,
                photographerId: photographerId,
                date: {
                    photographerAppointed: Date.now(),
                },
            }

            console.log('# dataOrder = ', dataOrder);
            
            this.updateOrderStatus(orderId, orderStatus);

            const path = cabViews[role][newRoleStatus].path;
            // console.log('# path = ', path);
            this.listeners.handleStatusButtonClick(path);


            // this.listeners.handleRoute()();
        }
    }
}

export default Listeners;

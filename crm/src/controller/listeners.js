import Router from './router.js';
import cabViews from '../data/cabViews.json' assert { type: "json" };
import menuData from '../data/menuData.json' assert { type: "json" };
import orderStatusToRoleStatus from '../data/orderStatusToRoleStatus.json' assert { type: "json" };
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

        const {role} = props;


    }

    async createProps(roleStatus) {
        // Запоминаем текущий статус работника в model - надо ли?
        this.controller.model.roleStatus = roleStatus;
           
        // TODO?: get orders depend on defaultStatus
        const allOrders = await this.controller.getOrderData();
        this.controller.model.orders = [...allOrders];
        // console.log('# 3 allOrders = ', allOrders);
        // console.log('# 3 this.controller.model.orders = ', this.controller.model.orders);
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
            // statusButtonListener: null, // добавляем после входа в конкретный заказ
        };

        console.log('# props = ', props);

        return props;
   }

    // обработчик кнопки списка заказов "Посмотреть"
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
            console.log('# this.view.cab.renderStatusView = ', this.view.cab.renderStatusView);
            this.view.cab.renderStatusView(props);

            // const method = cabViews[role][roleStatus].method;
            // console.log('# method = ', method);
            // this.view.cab[method](props);
        }
    }

    getOrderById(orderId) {
        return this.controller.model.orders.filter((order) => order._id === orderId)[0];
    }

    getRoleStatusFromOrderStatus(orderStatus, role) {
        console.log('# 5 orderStatus, role = ', orderStatus, role);
        const roleStatus = orderStatusToRoleStatus[orderStatus][role];

        this.controller.model.roleStatus = roleStatus;

        return roleStatus;
    }
    
    // statusButtonListener() {
    statusButtonListenerNotBind() {
        return async (event) => {
            // console.log('# 4 this = ', this);
            const action = event.target.getAttribute('action');
            console.log('# action = ', action);
            const orderId = this.model.orderId;
            // const orderStatus = this.model.orderStatuses[0];
            const role = this.model.auth.role;
            const orderStatus = this.model.orderStatus;
            const roleStatus = this.listeners.getRoleStatusFromOrderStatus(orderStatus, role);

            // console.log('# orderId = ', orderId);
            // console.log('# action = ', action);
            // console.log('# orderStatus = ', orderStatus);
            // console.log('# role = ', role);
            console.log('# role, roleStatus, orderStatus, action = ', role, roleStatus, orderStatus, action);
            const newOrderStatus = cabViews[role][roleStatus].statusButton[action].newOrderStatus;
            console.log('# newOrderStatus = ', newOrderStatus);
            this.model.orderStatus = newOrderStatus;
            // this.model.orderStatuses = newRoleStatus;

            if (roleStatus === null) {
                const orderId = this.model.orderId;
                const key = `${role}Id`;
                const orderData = {
                    _id: orderId,
                    [key]: null
                };
    
                (async () => {
                    await this.updateOrderStatus(orderData);
                    this.model.orders = await this.controller.getOrderData();
                })();

                const orderStatus = 'incoming'; // default
                this.model.orderStatus = 
                getRoleStatusFromOrderStatus(orderStatus, role)
                const path = menuData[role]['incoming'].path;
                this.listeners.handleStatusButtonClick(path);
            } else {
                
                const photographerId = event.target.parentElement.getAttribute('id');

                const additionalData = {
                    'incoming': {
                        photographerId: photographerId,
                    },
                    'shooting': {
                        editorId: "630e31db3f4dd1fd2ac944fd",
                    },
                }

                let newOrderData = {
                    _id: orderId,
                    status: newOrderStatus,
                    date: {
                        // newRoleStatus: Date.now(),
                    },
                }

                // const orderData = this.model.orders.filter((order) => order._id === orderId)[0];
                const orderData = this.listeners.getOrderById(orderId)
                console.log('# ---------- orderData = ', orderData, orderId);
                // newOrderData.date[newRoleStatus] = Date.now();
                newOrderData.date = { ...orderData.date, [newOrderStatus]: Date.now() };

                if (additionalData[orderStatus]) {
                    newOrderData = {...newOrderData, ...additionalData[orderStatus]};
                }

                // console.log('# dataOrder = ', dataOrder);
                
                this.updateOrderStatus(newOrderData);
                console.log('# role, newOrderStatus = ', role, newOrderStatus);
                const path = menuData[role][newOrderStatus].path;
                // console.log('# path = ', path);
                this.listeners.handleStatusButtonClick(path);


                // this.listeners.handleRoute()();
            }
        }
    }
}

export default Listeners;

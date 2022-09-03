import { editorId } from '../data/constants.js';
import Router from './router.js';
import EmployeeListener from './employeeListener.js';
import cabViews from '../data/cabViews.json' assert { type: "json" };
import menuData from '../data/menuData.json' assert { type: "json" };
import emailSending from '../data/emailSending.json' assert { type: "json" };
import orderStatusToRoleStatus from '../data/orderStatusToRoleStatus.json' assert { type: "json" };
import { getStatuses, getOrdersByStatuses } from '../utils/utils.js';

class Listeners extends Router{
    constructor(controller) {
        super();
        this.controller = controller;
        this.employeeListener = new EmployeeListener();
    }
    
    bindHandlers() {
        this.orderButtonListener = this.orderButtonListenerNotBind.bind(this.controller);
        // this.orderButtonListener.bind(this.controller)
        this.statusButtonListener = this.statusButtonListenerNotBind.bind(this.controller)
        // this.statusButtonListener.bind(this.controller)
        this.employeeEditListener = this.employeeListener.editNotBind.bind(this.controller)
        // console.log('# employeeEditListener = ', this.employeeEditListener);
        // this.employeeEditListener();
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

            const props = await this.createPropsByRoleStatus(roleStatus);
            
            // Рисуем кабинет со списком входящих заказов
            this.controller.view.renderCab(props);
            // Вешаем на меню обработчики
            this.routingMenu(role);
        }, true);
    }

    // обработчик кликов по меню
    async handleMenuClick(roleStatus) {
        // console.log('# handleMenuClick: roleStatus= ', roleStatus);
        const props = await this.createPropsByRoleStatus(roleStatus);

        if (['addOrder', 'statistics', 'employees'].includes(roleStatus)) {
            const { role } = props;
            const methodName = cabViews[role][roleStatus].method;
            this.controller.view.cab[methodName](props);
        } else {
            this.controller.view.cab.renderOrderList(props);
        }
    }

    async createPropsByRoleStatus(roleStatus) {
        await this.controller.updateModelDataByNewRoleStatus(roleStatus);
        
        const role = this.controller.model.auth.role;
        const users = (role === this.controller.model.admin) ? 
            await this.controller.getAllUsers() 
            : 
            [];
        const orderStatuses = this.controller.model.statuses;
        const ordersByRoleStatus = this.controller.getOrdersByRoleStatus();
        
        const props = {
            role: role,
            roleStatus: roleStatus,
            orderStatuses: orderStatuses,
            order: {},
            orders: ordersByRoleStatus,
            users: users,
            orderButtonListener: this.orderButtonListener,
            // statusButtonListener: null, // добавляем после входа в конкретный заказ
            employeeListener: this.employeeEditListener, // for EMPLOYEES VIEW
        };

        return props;
   }

    async createPropsByOrderId(orderId) {
        await this.controller.updateModelDataByOrderId(orderId);

        const roleStatus = this.controller.model.roleStatus;
        let props = await this.createPropsByRoleStatus(roleStatus);

        // const { orders } = props;
        // const [ currentOrder ] = orders.filter((order) => {
        //     return order._id === orderId;
        // });

        props = {
            ...props,
            order: this.controller.model.orderData,
            statusButtonListener: this.statusButtonListener,
        }
        
        return props;
    }

    // обработчик кнопки списка заказов "Посмотреть"
    orderButtonListenerNotBind() {
        return async (event) => {
            // this = controller
            const orderId = event.target.id;
            // console.log('# this.model.orderData = ', this.model.orderData);
            const props = await this.listeners.createPropsByOrderId(orderId);
            // console.log('# 8 props = ', props);
            this.view.cab.cabContainer.innerHTML = '';
            this.view.cab.renderStatusView(props);
        }
    }

    getOrderById(orderId) {
        return this.controller.model.orders.filter((order) => order._id === orderId)[0];
    }

    getRoleStatusFromOrderStatus(orderStatus, role) {
        // console.log('# 5 orderStatus, role = ', orderStatus, role);
        const roleStatus = orderStatusToRoleStatus[orderStatus][role];

        this.controller.model.roleStatus = roleStatus;

        return roleStatus;
    }

    // createNewOrderDataAfterAction(action) {

    // }

    // createOrderDataByOrderStatus(newOrderStatus) {


    //     return orderData;
    // }

    statusButtonListenerNotBind() {
        return async (event) => {
            // this = controller
            const action = event.target.getAttribute('action');
            // const orderId = this.model.orderId;

            const role = this.model.auth.role;
            const roleStatus = this.model.roleStatus;
            let newOrderStatus = cabViews[role][roleStatus].statusButton[action].newOrderStatus;
            
            let orderDates = {
                ...this.model.orderData.date,
                [newOrderStatus]: Date.now(),
            };

            // const orderData = this.listeners.createOrderDataByOrderStatus(newOrderStatus);
            let orderData = {
                _id: this.model.orderId,
                status: newOrderStatus,
                date: orderDates,

                // [key]: null
            };

            // --- Set new photographerId
            if (role === 'manager' && roleStatus === 'incoming') {
                const photographerId = event.target.parentElement.getAttribute('id');
                
                orderData = {
                    ...orderData,
                    photographerId: photographerId,
                }
            }

            // Если фотограф отказался от заказа
            if (role === 'photographer' && newOrderStatus === 'incoming') {
                orderData = {
                    ...orderData,
                    photographerId: '',
                }
            }

            // console.log('### orderData = ', orderData);

            // Update order in Mongo
            await this.updateOrder(orderData);

            // Update all orders in model
            this.model.orders = await this.getOrderData();

            // Show page
            // console.log('# Before IF: newOrderStatus = ', newOrderStatus);
            // console.log('# Before IF: orderStatusToRoleStatus[newOrderStatus][role] = ', orderStatusToRoleStatus[newOrderStatus][role]);
            if (orderStatusToRoleStatus[newOrderStatus][role] === 'none') {
                newOrderStatus = this.model.startStatuses[role];
            }

            // console.log('# role, newOrderStatus = ', role, newOrderStatus);
            const path = menuData[role][newOrderStatus].path;
            // console.log('# path = ', path);
            this.listeners.handleStatusButtonClick(path);

            // Отправка писем emailSending
            const emails = {
                manager: 'vovoka.path@gmail.com',
                photographer: 'vovoka@tut.by',
                editor: 'jubka.sumka@gmail.com',
            }
            const order = this.model.orderData;
            console.log('# 7 order = ', orderData);

            // emailSending[newOrderStatus].forEach((role) => 
            for (let [ role, isSending ] of Object.entries(emailSending[newOrderStatus])) {
                if (isSending) {
                    const mailData = {
                        clientEmail: emails[role], 
                        title: `CYP: У клиента ${order.clientEmail} сменился статус на '${newOrderStatus}'!`, 
                        msg: `Здравствуйте, ${role}!                             
                        У клиента ${order.clientEmail} сменился статус на ${newOrderStatus}.`,
                    }
                    
                    console.log(`# Email sended to ${role}. У клиента ${order.clientEmail} сменился статус на ${newOrderStatus}.`);
                    // await this.sendEmail(mailData);
                }
            };

            
        }
    }
}

export default Listeners;

// statusButtonListener() {
    // statusButtonListenerNotBind1() {
    //     return async (event) => {
    //         // this = controller
    //         const action = event.target.getAttribute('action');
            
    //         const orderId = this.model.orderId;
    //         const role = this.model.auth.role;
    //         const orderStatus = this.model.orderStatus;
    //         const roleStatus = this.listeners.getRoleStatusFromOrderStatus(orderStatus, role);

    //         console.log('# role, roleStatus, orderStatus, action = ', role, roleStatus, orderStatus, action);
    //         const newOrderStatus = cabViews[role][roleStatus].statusButton[action].newOrderStatus;
    //         console.log('# newOrderStatus = ', newOrderStatus);
    //         this.updateOrderStatus(newOrderData);
    //         // this.model.orderStatus = newOrderStatus;


    //         if (roleStatus === null) {
    //             const orderId = this.model.orderId;
    //             const key = `${role}Id`;
    //             const orderData = {
    //                 _id: orderId,
    //                 [key]: null
    //             };
    
    //             (async () => {
    //                 await this.updateOrderStatus(orderData);
    //                 this.model.orders = await this.controller.getOrderData();
    //             })();

    //             const orderStatus = 'incoming'; // default
    //             this.model.orderStatus = 
    //             getRoleStatusFromOrderStatus(orderStatus, role)
    //             const path = menuData[role]['incoming'].path;
    //             this.listeners.handleStatusButtonClick(path);
    //         } else {
                
    //             const photographerId = event.target.parentElement.getAttribute('id');

    //             const additionalData = {
    //                 'incoming': {
    //                     photographerId: photographerId,
    //                 },
    //                 'shooting': {
    //                     editorId: "630e31db3f4dd1fd2ac944fd",
    //                 },
    //             }

    //             let newOrderData = {
    //                 _id: orderId,
    //                 status: newOrderStatus,
    //                 date: {
    //                     // newRoleStatus: Date.now(),
    //                 },
    //             }

    //             // const orderData = this.model.orders.filter((order) => order._id === orderId)[0];
    //             const orderData = this.listeners.getOrderById(orderId)
    //             console.log('# ---------- orderData = ', orderData, orderId);
    //             // newOrderData.date[newRoleStatus] = Date.now();
    //             newOrderData.date = { ...orderData.date, [newOrderStatus]: Date.now() };

    //             if (additionalData[orderStatus]) {
    //                 newOrderData = {...newOrderData, ...additionalData[orderStatus]};
    //             }

    //             // console.log('# dataOrder = ', dataOrder);
                
    //             this.updateOrderStatus(newOrderData);
    //             console.log('# role, newOrderStatus = ', role, newOrderStatus);
    //             const path = menuData[role][newOrderStatus].path;
    //             // console.log('# path = ', path);
    //             this.listeners.handleStatusButtonClick(path);


    //             // this.listeners.handleRoute()();
    //         }
    //     }
    // }
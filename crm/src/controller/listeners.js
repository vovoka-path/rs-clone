import { editorId } from '../data/constants.js';
import Router from './router.js';
import EmployeeListener from './employeeListener.js';
import cabViews from '../data/cabViews.json' assert { type: "json" };
import menuData from '../data/menuData.json' assert { type: "json" };
import emailSending from '../data/emailSending.json' assert { type: "json" };
import titles from '../data/titles.json' assert { type: "json" };
import orderStatusToRoleStatus from '../data/orderStatusToRoleStatus.json' assert { type: "json" };
import { getStatuses, getOrdersByStatuses } from '../utils/utils.js';

const lang = 'ru';
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
        this.btnSendListener = this.btnSendListenerNotBind.bind(this.controller);
        this.btnCreateUserListener = this.btnCreateUserListenerNotBind.bind(this.controller);
        this.btnEditUserListener = this.btnEditUserListenerNotBind.bind(this.controller);
        this.btnDeleteUserListener = this.btnDeleteUserListenerNotBind.bind(this.controller);
        this.btnUpdateUserListener = this.btnUpdateUserListenerNotBind.bind(this.controller);
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
        // const users = (role === this.controller.model.admin) ? 
        //     await this.controller.getAllUsers() 
        //     : 
        //     [];
        const users = this.controller.model.users;
        const orderStatuses = this.controller.model.statuses;
        const ordersByRoleStatus = this.controller.getOrdersByRoleStatus();
        const allOrders = this.controller.model.allOrders;
        
        const props = {
            role: role,
            roleStatus: roleStatus,
            orderStatuses: orderStatuses,
            order: {},
            allOrders: allOrders,
            orders: ordersByRoleStatus,
            users: users,
            orderButtonListener: this.orderButtonListener,
            // statusButtonListener: null, // добавляем после входа в конкретный заказ
            employeeListener: this.employeeEditListener, // for EMPLOYEES VIEW
            btnSendListener: this.btnSendListener, // Create new Order
            btnCreateUserListener: this.btnCreateUserListener,
            btnEditUserListener: this.btnEditUserListener,
            btnDeleteUserListener: this.btnDeleteUserListener,
            btnUpdateUserListener: this.btnUpdateUserListener,
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
            const photographerId = event.target.parentElement.getAttribute('id');
            
            if (role === 'manager' && roleStatus === 'incoming') {
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
            const order = this.model.orderData;
            
            const [ manager ] = await this.getUsersByRole('manager');
            const [ photographer ] = order.photographerId ? await this.getUserById(order.photographerId) : '';
            const [ editor ] = order.editorId ? await this.getUserById(order.editorId) : '';
            // console.log('# photographerId = ', photographerId);
            // console.log('# photographer = ', photographer);
            const emails = {
                manager: manager.email,
                photographer: photographer.email,
                editor: editor.email,
            };
            const names = {
                manager: manager.name,
                photographer: photographer.name,
                editor: editor.name,
            };
            const newRoleStatus = orderStatusToRoleStatus[newOrderStatus][role];

            // console.log('# 7 newRoleStatus = ', newRoleStatus);

            // emailSending[newOrderStatus].forEach((role) => 
            for (let [ role, isSending ] of Object.entries(emailSending[newRoleStatus])) {
                if (isSending) {
                    const mailData = {
                        clientEmail: emails[role], 
                        title: `CYP: У клиента ${order.clientEmail} сменился статус на "${menuData[role][newOrderStatus].ru}"!`, 
                        msg: `Здравствуйте, ${names[role]}!                             
                        У клиента ${order.clientEmail} сменился статус на "${menuData[role][newOrderStatus].ru}".`,
                    }
                    
                    console.log(`# ${titles[role][lang]} ${names[role]} получил почту на свой ящик ${emails[role]}. У клиента ${order.clientEmail} сменился статус на "${menuData[role][newOrderStatus].ru}".`);
                    // await this.sendEmail(mailData);
                }
            };

            
        }
    }

    btnSendListenerNotBind() {
        const orderData =  {};
        const inputs = ['city', 'route', 'package_name', 'clientEmail', 'clientMessage'];
        const date = Date.now();
        inputs.forEach((el) => {
            console.log('# el = ', el);
            const curInput = document.querySelector(`#${el}`);
            orderData[el] = curInput.value;
            curInput.value ='';
        });
        orderData.date = {
            incoming: date,
        };
        
        this.createNewOrder(orderData);
    }

    btnCreateUserListenerNotBind() {
        return async (event) => {
            // this = controller

            console.log('# btnCreateUserListener:');
            console.log('# View CREATE USER (not found!)/ Must be created.');
            // this.view.cab.employees.employee.EmployeeEdit;
        }
    }

    btnEditUserListenerNotBind() {
        return async (event) => {
            // this = controller
            const id = event.target.id;
            const [ user ] = await this.getUserById(id);
            this.model.user = user;
            
            this.view.cab.employees.employee.employeeEdit.create(user);

            // console.log('# btnEditUserListener:');
            // console.log('# View EDIT USER id = ', id);
            // console.log('# this.view.cab.employees.employee.employeeEdit = ', this.view.cab.employees.employee.employeeEdit);
        }
    }

    btnDeleteUserListenerNotBind() {
        return async (event) => {
            // this = controller
            const id = event.target.id;
            // await this.deleteUser(id); // ОСТОРОЖНО !!!

            // this.view.cab.employees.employee.EmployeeEdit;

            console.log('# btnDeleteUserListener:');
            console.log('# DELETE USER id = ', id);
        }
    }

    btnUpdateUserListenerNotBind() {
        return async (event) => {
            // this = controller
            // const id = event.target.id;
            const user = this.model.user;
            ;

            const userData =  {
                _id: user._id,
            };
            const inputs = ['username', 'role', 'email', 'name'];
            inputs.forEach((el) => {
                const curInput = document.querySelector(`#userEdit-${el}`);
                userData[el] = curInput.value;
            });
    
            // console.log("UPDATE=", userData);

            await this.updateUser(userData);
            await this.getAllUsers();

            this.view.cab.cabContainer.innerHTML = '';
            this.view.cab.employees.create(this.model.users);
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
import { admin, editorId } from '../data/constants.js';
import { filterOrdersByStatus, getStatuses, getOrdersByStatuses } from '../utils/utils.js';
import cabViews from '../data/cabViews.json' assert { type: "json" };
import Api from './api.js';
import Listeners from './listeners.js';

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.api = new Api();
        this.listeners = new Listeners(this);
    }

    start() {
        this.view.renderSignIn();
        this.listeners.bindHandlers(this);
        this.listeners.signIn();
    }

    async getRole(formData) {
        const data = await this.api.signIn(formData).then(json => json.data);

        this.model.setAuth(data);

        return data;
    }
    
    async getOrderData(){
        const { token, role } = this.model.auth;
        const allOrders = await this.api.getOrderData(token, role);
        

        // this.model.users = await this.getAllUsers();
        this.model.photographers = this.getUsersByRole('photographer');

        // Присваиваем editorId, если его еще нет в заказе
        if (role === admin) {
            allOrders.forEach((order) => {
                if (!order.editorId) {
                    const orderData = {
                        _id: order._id,
                        editorId: editorId,
                    }

                    this.updateOrder(orderData);
                }
            })
        }

        // this.model.allOrders = allOrders;

        return allOrders;
    }

    async updateModelDataByNewRoleStatus(roleStatus) {
        // Запоминаем новый текущий статус работника в model 
        // значение передается из метода роутера (массив методов для каждого пути)
        // console.log('# 1 roleStatus = ', roleStatus);
        this.model.roleStatus = roleStatus;
        this.model.statuses = this.getOrderStatusesByRoleStatus();
        this.model.allOrders = await this.getOrderData();
        this.model.orders = this.getOrdersByRoleStatus();
    }

    getOrdersByRoleStatus() {
        const statuses = this.model.statuses;
        const allOrders = this.model.allOrders;
        let ordersByRoleStatus = [];
    
        statuses.forEach((status) => {
            ordersByRoleStatus.push(...filterOrdersByStatus(allOrders, status));
            // ordersByRoleStatus = [...ordersByRoleStatus, ...filterOrdersByStatus(orders, status)];
        });

        this.model.orders = ordersByRoleStatus;
    
        return ordersByRoleStatus;
    }

    async updateOrder(orderData) {
        const token = this.model.auth.token;
        const response = await this.api.updateOrder(orderData, token);
        // TODO: проверять response
        this.model.orderStatus = orderData.status;
    }

    async getUsersByRole(role) {
        // this.addUser();
        const allUsers = await this.getAllUsers(); // Проверить: можно ли брать из model

        const filteredUsers = allUsers.filter((user) => {
            if (user.role) return user.role === role;
        });

        return filteredUsers;
    }

    async getUserById(id) {
        const allUsers = await this.getAllUsers();
        const user = allUsers.filter((user) => user._id === id);

        return user;
    }

    async getAllUsers() {
        const token = this.model.auth.token;
        const users = await this.api.getUsers(token).then(json => json.data.users);
        this.model.users = users;

        // const mailData = {
        //     clientEmail: 'vovoka@tut.by', 
        //     title: 'CRM CYP', 
        //     msg: `Тут текст письма 
            
        //     это вторая строчка`,
        // }
        // await this.sendEmail(mailData);
        // console.log('# mail response = ', await this.sendEmail(mailData)); 

        return users;
    }

    async registrationUser(userData) {
        const response = await this.api.registrationUser(userData);
        await this.getAllUsers();
    }

    async updateUser(userData) {
        const token = this.model.auth.token;
        const response = await this.api.updateUser(token, userData);
        await this.getAllUsers();
    }

    async deleteUser(id) {
        const token = this.model.auth.token;
        const response = await this.api.deleteUser(token, id);
        await this.getAllUsers();
        // TODO: проверять response
    }

    async updateModelDataByOrderId(orderId) {
        this.model.orderId = orderId;
        this.model.orderData = await this.getOrderByOrderId(orderId);
    }

    async getOrderByOrderId(orderId) {
        const token = this.model.auth.token;
        const orderData = await this.api.getOrderById(orderId, token);

        return orderData;
    }

    getOrderStatusesByRoleStatus() {
        const role = this.model.auth.role;
        const roleStatus = this.model.roleStatus;
        // console.log('# 2 role, roleStatus = ', role, roleStatus);
        const orderStatuses = cabViews[role][roleStatus].statusesForOrders;
        this.model.orderStatuses = orderStatuses;
    
        return orderStatuses;
    }

    async sendEmail(mailData) {
        // console.log('# sendEmail = ', mailData);
        const token = this.model.auth.token;
        const response = await this.api.sendEmail(token, mailData);
        console.log('# sendEmail: response = ', response);
    }

    async createNewOrder(orderData) {
        const response = await this.api.createNewOrder(orderData);
        console.log('# createNewOrder: response = ', response);
        const roleStatus = this.model.roleStatus;
        await this.updateModelDataByNewRoleStatus(roleStatus);
    }
    
}

export default Controller;

    // username: {type: String, unique: true, required: true},
    // password: {type: String, required: true},
    // status: {type: String},
    // name: {type: String},
    // role: {type: String, ref: 'Role'}
    // async addUser() {
    //     // role: 'manager' || 'photographer' || 'editor'
    //     const formData = {
    //         username: 'nataly',
    //         password: 'qweasdzxcqweasdzxc',
    //         status: 'доступен',
    //         name: 'Наташа Королева',
    //         role: 'editor',
    //     }

    //     await this.api.signUp(formData);
    // }

        // getOrderByIdFromModel(orderId) {
    //     const orders = this.model.orders;

    //     const [ orderData ] = orders.filter((order) => order._id === orderId);
    
    //     return orderData;
    // }
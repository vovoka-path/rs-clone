import Api from './api.js';
import Listeners from './listeners.js';

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.api = new Api();
        this.listeners = new Listeners();
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
        if (role === 'manager') {
            this.getUsersByRole('photographer');
        }
        
        const orders = await this.api.getOrderData(token, role);
        this.model.orders = orders;

        return orders;
    }

    updateOrderStatus(orderData) {
        const token = this.model.auth.token;
        const response = this.api.updateOrder(orderData, token);
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

    // username: {type: String, unique: true, required: true},
    // password: {type: String, required: true},
    // status: {type: String},
    // name: {type: String},
    // role: {type: String, ref: 'Role'}
    async addUser() {
        // role: 'manager' || 'photographer' || 'editor'
        const formData = {
            username: 'nataly',
            password: 'qweasdzxcqweasdzxc',
            status: 'доступен',
            name: 'Наташа Королева',
            role: 'editor',
        }

        await this.api.signUp(formData);
    }

    async getAllUsers() {
        const token = this.model.auth.token;
        const users = await this.api.getUsers(token).then(json => json.data.users);
        this.model.users = users;

        return users;
    }

    async deleteUser(id) {
        const token = this.model.auth.token;
        const response = await this.api.deleteUser(token, id);
        // TODO: проверять response
    }
}

export default Controller;

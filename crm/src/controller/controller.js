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

        // this.updateOrderStatus('630383851f03c78cc3562156', 'acceptingPhotographer');
        // this.updateOrderStatus('6303848981b5339d4fce5d22', 'shooting');
        // this.updateOrderStatus('6308cbd1a509b499eb04583b', 'acceptingEditor');
        // this.updateOrderStatus('630387d47188d92f664ce91b', 'editing');
        // this.updateOrderStatus('630389da26bf30f0c954b7a1', 'sending');
        // this.updateOrderStatus('6305126d2bd69b0dc944d90b', 'completed');
        // this.updateOrderStatus('63051ec92bd69b0dc944d90e', 'canceled');
        // this.updateOrderStatus('6307c2896e7892024474117e', 'feedbacks');
        // this.updateOrderStatus('6307c28d6e78920244741180', 'shooting');
        // this.updateOrderStatus('6307c2d36e78920244741183', 'editing');
        // this.updateOrderStatus('6308cbbfa509b499eb045835', 'shooting');
    }

    async getRole(formData) {
        const json = await this.api.signIn(formData);
        const data = json.data;
        // console.log('# data = ', data);

        this.model.setAuth(data);

        return data;
    }
    
    async getOrderData(){
        const { token, role } = this.model.auth;
        if (role === 'manager') {
            this.getUsersByRole('photographer');
        }
        // console.log('# token = ', role, token);
        
        const orders = await this.api.getOrderData(token, role);
        this.model.orders = orders;
        // console.log('# orders = ', orders);

        return orders;
    }

    updateOrderStatus(dataOrder) {
        const token = this.model.auth.token;
        console.log('# token = ', token);
        console.log('# dataOrder = ', dataOrder);
        this.api.updateOrder(dataOrder, token)
        this.model.orderStatus = dataOrder.status;
    }

    async getUsersByRole(role) {
        // this.deleteUser("630cf62c84370666755cafe6");
        // this.addUser();

        const allUsers = await this.getAllUsers();
        console.log('# allUsers = ', allUsers, role);

        const filteredUsers = allUsers.filter((user) => {
            // console.log('# user.role = ', user.role);
            if (user.role) return user.role === role
        });
        // console.log('# filteredUsers = ', filteredUsers);

        return filteredUsers;
    }

    async addUser() {
			// role: 'manager' || 'photographer' || 'editor'
            const formData = {
                username: 'nataly',
                password: 'qweasdzxcqweasdzxc',
                status: 'доступен',
                name: 'Наташа Королева',
                role: 'editor',
            }
        // username: {type: String, unique: true, required: true},
        // password: {type: String, required: true},
        // status: {type: String},
        // name: {type: String},
        // role: {type: String, ref: 'Role'}

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
        // console.log('# token = ', token);
        const response = await this.api.deleteUser(token, id);
        // console.log('# response = ', response);
    }
}

export default Controller;

// ------------------------- archive -----------------------------

        // this.pageListeners = {
        //     signin: () => this.listeners.signIn(),
        //     manager: (role) => this.listeners.routingMenu(role),
        //     photographer: (role) => this.listeners.routingMenu(role),
        //     editor: (role) => this.listeners.routingMenu(role),
        // };

    // renderCab(pageName) {
    //     const role = this.model.getAuth().role;

    //     this.view.container.innerHTML = '';

    //     (async () => {
    //         const orders = await this.getOrderData(this.model.auth.token);
    //         this.view.render(pageName, orders, this.listeners.router.previewButtons());
    //         this.pageListeners[pageName](role);
    //     })();
    // }
        // if (this.pageName === 'signin') {
        //     // без запроса orderDara
        //     this.view.render(this.pageName);
        //     this.pageListeners[this.pageName](role);
        // } else {
        //     // c запросом orderData
        //     this.renderCab(this.pageName);
        // }

    // setCurrentPageListener(role) {
    //     this.listeners[role]();
    // }

    // async getOrderData() {
    //     // get from api
    //     const data = await this.getCars();
    //     console.log('# data = ', data);

    //     return data;
    //     // return dataOrders;
    // }

    
    // updateURL(path) {
    //     if (history.pushState) {
    //         var baseUrl = window.location.protocol 
    //             + "//" + window.location.host 
    //             // + window.location.pathname;
    //         var newUrl = baseUrl + path;
    //         history.pushState(null, null, newUrl);
    //     }
    //     else {
    //         console.warn('History API не поддерживает ваш браузер');
    //     }
    // }
       

    // setHandlers() {
    //     this.view.handlers.Submit = this.Submit;
    //     this.view.handlers.Submit = this.Submit;
    // }

    // handleSignInButton(event) {
    //     event.preventDefault();
    //     console.log('# this = ', this);
    //     const password = this.view.signIn.input.value; signIn.input.value;
    //     console.log('handleSignInButton: password=', password);
        
    //     // this.api.setRole(password);
    //     this.model.setRole(password);
    //     // this.view.renderHeader(this.func1);
    //     this.view.innerHTML = '';
    //     this.view.renderStartPage(this.model.startPageData);
    // }
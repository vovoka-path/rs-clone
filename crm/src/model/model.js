import { admin, editorId } from '../data/constants.js';
class Model {
    constructor() {
        // this.role = 'signin';
        this.admin = admin;
        this.photographers = [];
        this.editorId = editorId;
        this.auth = {
            username: "String", 
            password: "String", 
            role: 'manager',
        };
        // this.usersID = '';
        this.orderId = '';
        this.orderData = {};
        this.roleStatus = 'incoming';
        this.orderStatus = 'incoming';
        this.orderStatuses = [];
        this.orders = [];
        this.users = [];
        this.user = {};
        this.startStatuses = {
            manager: 'incoming',
            photographer: 'acceptingPhotographer',
            editor: 'acceptingEditor',
        };
        // this.startRoleStatus = 'incoming';
    }

    setAuth(data) {
        this.auth = data;
    }

    getAuth() {
        return this.auth;
    }
}

export default Model;

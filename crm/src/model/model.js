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
        // TODO
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

// ------------------------- archive -----------------------------

    // getStartPageData() {
    //     // const data = await api;//request to our server;
    //     const data = {
    //         role: 'signin',
    //     };

    //     return data;
    // }

    // setRole(password) {
    //     console.log('# password = ', password);
    //     // const role = await api with password;//request to our server;
    //     const role = 'manager';

    //     this.role = role;
    // }
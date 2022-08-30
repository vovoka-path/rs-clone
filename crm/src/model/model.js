class Model {
    constructor() {
        // this.role = 'signin';
        this.auth = {};
        this.usersID = '';
        this.roleStatus = '';
        this.orderId = '';
        this.orderStatus = ''; // ?
        this.orderStatuses = []; // ?
        this.orders = []; // ?
        this.startStatuses = {
            manager: 'incoming',
            photographer: 'acceptingPhotographer',
            editor: 'acceptingEditor',
        };
        this.users = {};
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
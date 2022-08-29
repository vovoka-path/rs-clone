class ModelOrders {
    constructor() {
        
    }

    async getOrdersData() {
        const data = await api;//request to our server;

        return data;
    }

    getOrdersMethods() {
        return {
            ordersMethod0: () => this.orderMethos0(),
            ordersMethod1: () => this.orderMethos1(),
        }
    }

    orderMethos0() {

    }

    orderMethos1() {
        
    }
}

export default ModelOrders;
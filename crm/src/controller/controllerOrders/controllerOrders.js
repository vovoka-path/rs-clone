// import viewOrders from './components/view/orders';
// import modelOrders from './components/view/orders';

class controllerOrders {

    start() {
        const ordersData = this.modelOrders.getData();
        this.viewOrders.render(ordersData);

        const ordersMethods = this.modelOrders.getOrdersMethods();
        this.viewOrders.setListeners(ordersMethods);
    }
    
}

export default controllerOrders;
import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab.js';
// import { createCustomElement, setAttributesElement} from '../../utils/utils.js';

const role = 'manager';
// const styles = {
//     mainContainer: 'main-container',
//     cabContainer: 'cab-container',
// }

class ManagerCab extends Cab{
    constructor() {
        super(role);
        this.orderInCab = new OrderInCab();
    }

    renderOrderData(props) {
        this.orderCabContainer = this.orderInCab.render(props);
        this.cabContainer.append(this.orderCabContainer);
    }
    
    // *** Cab Views ***

    renderIncoming(props) {
        this.fakeView(props); // DELETE
    }

    renderAcceptingPhotographer(props) {
        this.fakeView(props); // DELETE

    }

    renderShooting(props) {
        this.fakeView(props); // DELETE

    }

    renderAcceptingEditor(props) {
        this.fakeView(props); // DELETE

    }

    renderEditing(props) {
        this.fakeView(props); // DELETE

    }

    renderSending(props) {
        this.fakeView(props); // DELETE

    }

    renderCompleted(props) {
        this.fakeView(props); // DELETE

    }

    renderCanceled(props) {
        this.fakeView(props); // DELETE

    }

    renderFeedbacks(props) {
        this.fakeView(props); // DELETE

    }

    renderAddOrder(props) {
        this.fakeView(props); // DELETE

    }

    renderStatistics(props) {
        this.fakeView(props); // DELETE

    }

    renderEmployees(props) {
        this.fakeView(props); // DELETE

    }
}

export default ManagerCab;

// ------------------------- archive -----------------------------

        // this.cabName = 'manager';
        // this.menu = new Menu(this.cabName);
        // this.mainContainer = createCustomElement('main', styles.mainContainer);
        // this.cabContainer = createCustomElement('cab-container', styles.cabContainer);
        // this.ordersList = new OrdersList();
        // this.container = this.createOldContainer();
        // this.menuContainer = this.createContainer('menu-container');
        // this.listContainer = this.createListContainer();
        // this.orderContainer = createCustomElement('order-container');
        // this.orders = createCustomElement('orders');
        // this.photographerListContainer = this.createContainer('incoming');
        // this.commentsContainer = this.createContainer('shooting');
        // this.sendingToClientContainer = this.createContainer('sending');
        // this.orderCabContainer = this.createOrderCab();

    
    // render(props) {
    //     this.addMenu();
    //     this.addFirstCabView(props);

    //     return this.mainContainer;
    // }
    
    // addMenu() {
    //     this.mainContainer.append(this.menu.render());
    // }

    // addFirstCabView(props) {
    //     this.renderOrderList(props);
    //     this.mainContainer.append(this.cabContainer);
    // }

    // renderOrderList(props) {
    //     this.cabContainer.innerHTML = '';
    //     this.cabContainer.append(this.ordersList.render(props));
    // }
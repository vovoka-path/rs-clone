import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab/orderInCab.js';
import PhotographerList from '../../components/photographerList/photographerList.js';
import { createCustomElement, setAttributesElement} from '../../utils/utils.js';
import Employees from '../../components/Employees/Employees.js';
import OrderCreate from '../../components/OrderCreate/OrderCreate.js';
import Statistics from '../../components/Statistics/Statistics.js';

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
        // this.fakeView(props); // DELETE
        this.changedElement = createCustomElement('div', 'cab-incoming');

        this.photographerList = new PhotographerList();
        // console.log('# this.photographerList = ', this.photographerList);
        // console.log('# this.photographerList.create = ', this.photographerList.create);
        this.list = this.photographerList.create(props);
        // console.log('# this.list  = ', this.list);
        this.changedElement.append(this.list);
        this.cabContainer.append(this.changedElement);
    }

    renderAcceptingPhotographer(props) {
        this.renderStatusDataView(props); // DELETE
        
    }

    renderShooting(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderAcceptingEditor(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderEditing(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderSending(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderCompleted(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderCanceled(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderFeedbacks(props) {
        this.cabContainer.innerHTML = '';
        this.renderStatusDataView(props); // DELETE

    }

    renderAddOrder(props) {
        this.cabContainer.innerHTML = '';

        const addOrderView = new OrderCreate(this.cabContainer);

        addOrderView.renderCreateView(props);

    }

    renderStatistics(props) {
        this.cabContainer.innerHTML = '';
        
        const statsView = new Statistics(props, this.cabContainer);
        statsView.create();
    }

    renderEmployees(props) {
        // console.log('# props = ', props);
        this.cabContainer.innerHTML = '';
        this.employees = new Employees(this.cabContainer, props);


        const users = props.users;
        this.employees.create(users);
        // const employeesView = Employees.create(users);
        // this.cabContainer.append(employeesView);
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
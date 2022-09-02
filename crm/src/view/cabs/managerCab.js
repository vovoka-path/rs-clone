import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab.js';
import PhotographerList from '../../components/photographerList/photographerList.js';
import { createCustomElement, setAttributesElement} from '../../utils/utils.js';
import Employees from '../../components/Employees/Employees.js';
import Employee from '../../components/Employee/Employee.js';
import EmployeeEdit from '../../components/Employee/EmployeeEdit/EmployeeEdit.js';

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
        this.statusDetailsView(props); // DELETE
        
    }

    renderShooting(props) {
        this.statusDetailsView(props); // DELETE

    }

    renderAcceptingEditor(props) {
        this.statusDetailsView(props); // DELETE

    }

    renderEditing(props) {
        this.statusDetailsView(props); // DELETE

    }

    renderSending(props) {
        this.statusDetailsView(props); // DELETE

    }

    renderCompleted(props) {
        this.statusDetailsView(props); // DELETE

    }

    renderCanceled(props) {
        this.statusDetailsView(props); // DELETE

    }

    renderFeedbacks(props) {
        this.cabContainer.innerHTML = '';
        this.statusDetailsView(props); // DELETE

    }

    renderAddOrder(props) {
        this.cabContainer.innerHTML = '';
        this.statusDetailsView(props); // DELETE

    }

    renderStatistics(props) {
        this.cabContainer.innerHTML = '';
        this.statusDetailsView(props); // DELETE

    }

    renderEmployees(props) {
        this.cabContainer.innerHTML = '';
        const employees = new Employees(this.cabContainer);



        const users = props.users;
        employees.create(users);
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
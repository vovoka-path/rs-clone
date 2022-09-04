import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab/orderInCab.js';
import PhotographerList from '../../components/photographerList/photographerList.js';
import { createCustomElement, setAttributesElement} from '../../utils/utils.js';
import Employees from '../../components/Employees/Employees.js';
import OrderCreate from '../../components/OrderCreate/OrderCreate.js';
import Statistics from '../../components/Statistics/Statistics.js';
import SubCab from '../../components/SubCab/SubCab.js';
import AddLink from '../../components/AddLink/AddLink.js';
import AddMessage from '../../components/AddMessage/AddMessage.js';


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
    
    renderIncoming(props) {
        this.cabInfo = createCustomElement('div', 'cab-incoming');
        this.photographerList = new PhotographerList();
        this.list = this.photographerList.create(props);
        this.cabInfo.append(this.list);
        this.cabContainer.append(this.cabInfo);
        this.addMessage = new AddMessage(props).create();
        this.cabContainer.append(this.addMessage);
    }

    renderAcceptingPhotographer(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());
    }

    renderShooting(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());
    }

    renderAcceptingEditor(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());

    }

    renderEditing(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());
    }

    renderSending(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());
    }

    renderCompleted(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());
    }

    renderCanceled(props) {
        this.renderStatusButtons(props);
        this.subCab = new SubCab(props);
        this.cabContainer.append(this.subCab.create());
    }

    renderFeedbacks(props) {
        this.cabContainer.innerHTML = '';
        this.renderStatusButtons(props);

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
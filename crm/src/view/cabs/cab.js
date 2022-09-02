import cabViews from '../../data/cabViews.json' assert { type: "json" };
// import Menu from '../../components/menu/menu.js';
import { Menu } from '../../components/Menu/Menu.js';
import OrdersList from '../../components/ordersList/ordersList.js';
import StatusButton from '../../components/statusButton/statusButton.js';
import { createCustomElement } from '../../utils/utils.js';
import Header from '../../components/Header/Header.js';
    
const styles = {
    mainContainer: 'main-container',
    cabContainer: 'cab-container',
}

class Cab {
    constructor(role) {
        this.role = role;
        this.header = Header.create(2, "Входящие", 'cab__title')
        this.menu = new Menu(this.role);
        this.mainContainer = createCustomElement('main', styles.mainContainer);
        this.cabContainer = createCustomElement('div', styles.cabContainer);
        this.ordersList = new OrdersList();
        this.statusButtons = [];
    }

    // fake
    renderStatusDataView(props) {
        // console.log('# props = ', props);
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;
        this.changedElement = createCustomElement('div', 'fake');
        const title = createCustomElement('h4');

        title.innerText = `
            ${role} - Кабинет
            ${roleStatus} - статус у ${role} (отобразить тут нужные блоки)
        `;
            
        this.changedElement.append(title);
        console.log('# ----------fakeView --- role = ', role, roleStatus);
        if (!(role === 'manager' && roleStatus === 'incoming')) {
            this.renderStatusButtons(props);
        }

        this.cabContainer.append(this.changedElement);
    }

    renderStatusButtons(props) {
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;
        const lang = 'ru';
        const statusButtonTexts = cabViews[role][roleStatus].statusButton;

        for (let key in statusButtonTexts) {
            const statusButtonText = statusButtonTexts[key][lang];

            if (statusButtonText !== null) {
                // console.log('# statusButtonText = ', statusButtonText);
                const btnProps = {
                    statusButtonText: statusButtonText,
                    action: key,
                }
                this.statusButton = new StatusButton().create(btnProps);
                this.statusButtons.push(this.statusButton);

                // Вешаем обработчик
                this.statusButton.addEventListener('click', statusButtonListener()); // TODO listener
                
                this.changedElement.append(this.statusButton);
            }
        }
    }
    
    render(props) {
        this.mainContainer.append(this.header);
        this.addMenu();
        // this.addFirstCabView(props);
        this.renderOrderList(props);
        this.addMenuBtn();
        

        return this.mainContainer;
    }

    addMenuBtn(){
        const menuBlock = document.createElement('div');
        const menuBtn = document.createElement('div');
        menuBlock.className = 'menu-block';
        menuBtn.className = 'menu-btn';
        menuBtn.addEventListener('click', () => {
            const menu = document.querySelector('.menu-container');
            menu.classList.toggle('menu-toggle');
        });

        menuBlock.append(menuBtn);
        this.mainContainer.append(menuBlock);
    }
    
    addMenu() {
        this.mainContainer.append(this.menu.create());
    }

    // Показывает список входящих заказов, разный для каждой роли.
    // addFirstCabView(props) {
    // }

    // Рендерит список заказов в зависимости от статуса 
    // после клика в меню или по умолчанию входящие
    renderOrderList(props) {
        this.cabContainer.innerHTML = '';
        this.cabContainer.append(this.ordersList.create(props));
        this.mainContainer.append(this.cabContainer);
    }

    // Рисуем кабиент в зависимости от orderStatus
    renderStatusView(props) {
        // console.log('# props = ', props);
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;
        
        // Данные заказа во всех Views отображаются всегда
        this.renderOrderData(props);

        // Отображаем View, которое зависит от статуса заказа
        // console.log('# cabViews[role][roleStatus] = ', cabViews[role][roleStatus]);
        this[cabViews[role][roleStatus].method](props);

        this.mainContainer.append(this.cabContainer);

        return this.container;
    }
    
    removeOrderList() {
        this.cabContainer.innerHTML = '';
    }
}

export default Cab;

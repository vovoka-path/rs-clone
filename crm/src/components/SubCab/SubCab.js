import titles from '../../data/titles.json' assert { type: "json" };
import cabinet from '../../data/cabinet.json' assert { type: "json" };
import Button from '../Button/Button.js';
import Header from '../Header/Header.js';
import Container from '../Container/Container.js';
import Paragraph from '../Paragraph/Paragraph.js';
import { createCustomElement, timeMethods } from '../../utils/utils.js';

const lang = 'ru';

class SubCab {
    constructor(props) {
        this.props = props;
    }
    create() {
        const { employees, order } = this.props;
        const orderStatus = order.status;
        const subCabContainer = createCustomElement('div', `subcab cab-${orderStatus}`);

        for (let [ role, employee ] of Object.entries(employees)) {
            const itemNames = cabinet.items;
            const itemsData = cabinet[orderStatus][role];

            if (itemsData.container) {
                const name = employee.name;
                const dates = order.date;

                const title = Header.create(3, `${titles[role][lang]}`, 'cab-user_title');
                const subTitle = Header.create(4, `${name}`, 'cab-user_subtitle');

                const userContainer = Container.create(`cab-${role}`, title);
                userContainer.append(subTitle);


                itemNames.forEach((itemName) => {
                    if (itemsData[itemName]) {
                        const time = timeMethods[itemName](role, dates);
                        const content = cabinet[lang][itemName].replace('{time}', time);

                        const paragraph = Paragraph.create(`cab-paragraph cab-${itemName}`, content) 
                        const itemContainer = Container.create(`cab-${itemName}`, paragraph);
                        
                        userContainer.append(itemContainer);
                    }
                });

                subCabContainer.append(userContainer);
            }
        }
        
        return subCabContainer; 
    }
}

export default SubCab;

        // имя
        // notAcceptingDuration Принимает уже <время сколько длится статус acceptingPhotographer>
        // accepted Принял <дата и время когда фотограф принял заказ>
        // acceptingDuration Принял в течение <длительность статуса acceptingPhotographer>
        // workingDuration Передал фото в течение <время между датой съемки и датой статуса acceptingEditor>
        
        // notAcceptingDuration Принимает уже <время сколько длится статус acceptingEditor>
        // accepted Принял <дата и время когда обработчик принял заказ>
        // acceptingDuration Принял заказ в течение <время длительности статуса acceptingEditor>
        // workingDuration за <время длительности статуса editig>
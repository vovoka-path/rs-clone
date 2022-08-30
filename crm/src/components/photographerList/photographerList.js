import StatusButton from '../statusButton/statusButton.js';
import { createCustomElement, setAttributesElement } from '../../utils/utils.js';
import cabViews from '../../data/cabViews.json' assert { type: "json" };

const styles = {
    container: 'photographer-list-container',
    photogrpherContainer: 'photographer-container',
    button: 'photographer-button',
}

class PhotographerList {
    constructor() {
        this.container = createCustomElement('div', styles.container);
        this.photogrpherContainer = createCustomElement('div', styles.photogrpherContainer);
        this.statusButtons = [];
    }

    create(props) {
        const { users } = props;
        console.log('# props = ', props);
        const photographers = users.filter((user) => user.role === 'photographer');

        photographers.forEach((photographer) => {
            this.photographer = document.createElement('h3');

            this.photographer.innerText = photographer.username;
            this.photogrpherContainer.append(this.photographer);

            setAttributesElement(this.photogrpherContainer, {
                'name': photographer.name,
                'status': photographer.status,
                'id': photographer._id,
            })
            
            this.renderStatusButtons(props);

            // this.StatusButton = new StatusButton() 
            // const statusButtonTexts = cabViews[role][roleStatus].statusButtonText;

            // const { statusButtonText, action } = props;

            // this.button = this.StatusButton.create(props); // props!!!
            // console.log('# this.button = ', this.button);
            // this.photogrpherContainer.append(this.button);
        });
        
        this.container.append(this.photogrpherContainer);

        return this.container;
    }

    renderStatusButtons(props) {
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener } = props;
        const lang = 'ru';
        const statusButtonTexts = cabViews[role][roleStatus].statusButtonText;

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
                
                this.photogrpherContainer.append(this.statusButton);
                // this.changedElement.append(this.statusButton);
            }
        }
    }
    // renderButton() {
    //     const button = createCustomElement('button', styles.button);

    // }
}

export default PhotographerList;

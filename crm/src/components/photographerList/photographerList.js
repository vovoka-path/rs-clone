import StatusButton from '../statusButton/statusButton.js';
import { createCustomElement, setAttributesElement } from '../../utils/utils.js';
import cabViews from '../../data/cabViews.json' assert { type: "json" };

const styles = {
    container: 'photographer-list-container',
    photographerContainer: 'photographer-container',
    photographerKey: 'photographer-key',
    button: 'photographer-button',
}

class PhotographerList {
    constructor() {
        this.container = createCustomElement('div', styles.container);
        this.statusButtons = [];
    }

    create(props) {
        const { users } = props;
        // console.log('# props = ', props);
        const photographers = users.filter((user) => user.role === 'photographer');

        photographers.forEach((photographer) => {
            // this.photographer = document.createElement('h3');
            // console.log('# photographer = ', photographer, Object.entries(photographer));
            const photographerContainer = createCustomElement('div', styles.photographerContainer);

            for (let [key, value] of Object.entries(photographer)) {
                if (!['password', 'role', 'username', '__v', '_id'].includes(key)) {
                    const photographerKey = createCustomElement('div', `${styles.photographerKey} photographer-${key}`);
                    photographerKey.innerText = photographer[key];

                    photographerContainer.append(photographerKey);
                }
            }

            this.container.append(photographerContainer);

            setAttributesElement(photographerContainer, {
                'name': photographer.name,
                'status': photographer.status,
                'id': photographer._id,
            })
            
            this.renderStatusButtons(photographerContainer, props);

            // this.StatusButton = new StatusButton() 
            // const statusButtonTexts = cabViews[role][roleStatus].statusButtonText;

            // const { statusButtonText, action } = props;

            // this.button = this.StatusButton.create(props); // props!!!
            // console.log('# this.button = ', this.button);
            // this.photogrpherContainer.append(this.button);
        });
        

        return this.container;
    }

    renderStatusButtons(photographerContainer, props) {
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
                
                photographerContainer.append(this.statusButton);
                // this.changedElement.append(this.statusButton);
            }
        }
    }
    // renderButton() {
    //     const button = createCustomElement('button', styles.button);

    // }
}

export default PhotographerList;

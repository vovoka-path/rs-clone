import StatusButton from '../statusButton/statusButton.js';
import { createCustomElement, setAttributesElement } from '../../utils/utils.js';
import cabViews from '../../data/cabViews.json' assert { type: "json" };
import Header from "../Header/Header.js";

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
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener, users } = props;
        const photographers = users.filter((user) => user.role === 'photographer');
        const header = Header.create(3, 'Фотографы', 'header-photographers');
        this.container.append(header);

        photographers.forEach((photographer) => {
            this.renderPhotographerContainer(photographer);
            this.renderStatusButtons(this.container.photographerContainer, props);
        });
        

        return this.container;
    }

    renderPhotographerContainer(photographer) {
        this.photographerContainer = createCustomElement('div', styles.photographerContainer);

            for (let [key, value] of Object.entries(photographer)) {
                // TODO: replace keys in config
                if (!['password', 'role', 'username', '__v', '_id'].includes(key)) {
                    if (key === 'status') {
                        const photographerKey = createCustomElement('div', `${styles.photographerKey} photographer-${key}`);
                        
                        photographerKey.innerText = value === 'доступен' ? "✅" : "⛔";
    
                        this.photographerContainer.append(photographerKey);
                    } else if (key === 'email') {
                        continue;
                    } else {
                        const photographerKey = createCustomElement('div', `${styles.photographerKey} photographer-${key}`);

                        photographerKey.innerText = value;
    
                        this.photographerContainer.append(photographerKey);
                    }

                }
                
            }

            this.container.append(this.photographerContainer);

            setAttributesElement(this.photographerContainer, {
                'name': photographer.name,
                'status': photographer.status,
                'id': photographer._id,
            })

            return 
    }

    renderStatusButtons(photographerContainer, props) {
        const { role, roleStatus, orderStatuses, order, orderButtonListener, statusButtonListener, users } = props;
        const lang = 'ru';
        const statusButtonTexts = cabViews[role][roleStatus].statusButton;

        for (let key in statusButtonTexts) {
            const statusButtonText = statusButtonTexts[key][lang];

            if (statusButtonText !== null) {
                const btnProps = {
                    statusButtonText: statusButtonText,
                    action: key,
                }

                this.statusButton = new StatusButton().create(btnProps);
                this.statusButtons.push(this.statusButton);

                // Вешаем обработчик
                this.statusButton.addEventListener('click', statusButtonListener()); // TODO listener
                
                this.photographerContainer.append(this.statusButton);
            }
        }
    }
}

export default PhotographerList;

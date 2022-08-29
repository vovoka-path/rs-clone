import cabViews from '../../data/cabViews.json' assert { type: "json" };
import { createCustomElement } from '../../utils/utils.js';

class statusButton {
    constructor() {
        this.button = createCustomElement('button', 'btn-status');
    }

    create(statusButtonText) {
        this.button.innerText = statusButtonText;
        
        return this.button;
    }
}

export default statusButton;

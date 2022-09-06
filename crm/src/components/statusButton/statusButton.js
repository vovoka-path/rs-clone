import cabViews from '../../data/cabViews.json' assert { type: "json" };
import { createCustomElement, setAttributesElement } from '../../utils/utils.js';

class statusButton {
    constructor() {
        this.button = document.createElement('button');
    }

    create(props) {
        const { statusButtonText, action } = props;
        this.button.innerText = statusButtonText;
        this.button.className = 'status-btn';
        this.action = action;
        this.button.setAttribute('action', action);
        //, 'btn-status'
        
        return this.button;

    }
}

export default statusButton;

import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab/orderInCab.js';
import AddLink from '../../components/AddLink/AddLink.js';
import AddMessage from '../../components/AddMessage/AddMessage.js';
// import { createCustomElement, setAttributesElement} from '../../utils/utils.js';

const role = 'editor';

class EditorCab extends Cab{
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
        this.renderStatusButtons(props);
    }

    renderEditing(props) {
        this.addLink = new AddLink(props);
        this.cabContainer.append(this.addLink.create());
        this.renderStatusButtons(props);
        this.addMessage = new AddMessage(props).create();
        this.cabContainer.append(this.addMessage);
    }

    renderCompleted(props) {
        this.renderStatusButtons(props);

    }

    renderFeedbacks(props) {
        this.renderStatusButtons(props);

    }

    renderStatistics(props) {
        this.renderStatusButtons(props);

    }
}

export default EditorCab;

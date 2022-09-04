import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab/orderInCab.js';
import AddLink from '../../components/AddLink/AddLink.js';
// import { createCustomElement, setAttributesElement} from '../../utils/utils.js';

const role = 'photographer';

class PhotographerCab extends Cab{
    constructor() {
        super(role);
        this.orderInCab = new OrderInCab();
    }

    renderOrderData(props) {
        this.orderCabContainer = this.orderInCab.render(props);
        this.cabContainer.append(this.orderCabContainer);
    }
    
    // *** Cab statusOrder Views ***

    renderIncoming(props) {
        this.renderStatusButtons(props);
    }

    renderShooting(props) {
        this.addLink = new AddLink(props);
        this.cabContainer.append(this.addLink.create());
        this.renderStatusButtons(props);

    }

    renderEditing(props) {
        this.addLink = new AddLink(props);
        this.cabContainer.append(this.addLink.create());
        this.renderStatusButtons(props);

    }

    renderCompleted(props) {
        this.renderStatusButtons(props);

    }

    renderCanceled(props) {
        this.renderStatusButtons(props);

    }

    renderFeedbacks(props) {
        this.renderStatusButtons(props);

    }

    renderStatistics(props) {
        this.renderStatusButtons(props);

    }
}

export default PhotographerCab;

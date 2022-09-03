import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab/orderInCab.js';
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
    
    // *** Cab Views ***

    renderIncoming(props) {
        this.renderStatusDataView(props); // DELETE
    }

    renderShooting(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderEditing(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderCompleted(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderCanceled(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderFeedbacks(props) {
        this.renderStatusDataView(props); // DELETE

    }

    renderStatistics(props) {
        this.renderStatusDataView(props); // DELETE

    }
}

export default PhotographerCab;

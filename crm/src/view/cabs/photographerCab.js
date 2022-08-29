import Cab from './cab.js';
import OrderInCab from '../../components/order/orderInCab.js';
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
        this.fakeView(props); // DELETE
    }

    renderShooting(props) {
        this.fakeView(props); // DELETE

    }

    renderEditing(props) {
        this.fakeView(props); // DELETE

    }

    renderCompleted(props) {
        this.fakeView(props); // DELETE

    }

    renderCanceled(props) {
        this.fakeView(props); // DELETE

    }

    renderFeedbacks(props) {
        this.fakeView(props); // DELETE

    }

    renderStatistics(props) {
        this.fakeView(props); // DELETE

    }
}

export default PhotographerCab;

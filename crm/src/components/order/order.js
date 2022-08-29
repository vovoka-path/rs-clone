class Order {
    constructor() {
        this.header = this.createHeader();
    }

    render(status = 'One order') {
        // const { status } = startPageData;
        this.header.innerText = status;
        
        // create order elements
        // create order elements
        // create order elements
        // create order elements
        return this.header;
    }

    createHeader() {
        const header = document.createElement('h3');
        // header.innerText = 'incoming';

        return header;
    }

    createList(status = 'incoming') {

        const list = document.createElement('h3');
        // header.innerText = 'incoming';

        return list;
    }
}

export default Order;
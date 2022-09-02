import Container from "../../Container/Container.js";
import Header from "../../Header/Header.js";

class EmployeeEdit {
    constructor(cabContainer) {
        this.cabContainer = cabContainer;
    }

    create(user) {
        console.log(this.cabContainer);
        this.cabContainer.innerHTML = '';
        Header.create(1, 'Hello', 'title')
    }
}

export default EmployeeEdit;

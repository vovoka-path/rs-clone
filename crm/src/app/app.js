// import './app.scss';
import Controller from '../controller/controller.js';
import View from '../view/view.js';
import Model from '../model/model.js';

class App {
    constructor() {
        this.controller = new Controller(new View(), new Model());
    }

    start() {
        this.controller.start();
    }
}

export default App;
import SignIn from './viewSignIn/viewSignIn.js';
import ManagerCab from './cabs/managerCab.js';
import PhotographerCab from './cabs/photographerCab.js';
import EditorCab from './cabs/editorCab.js';

const CABS = {
    manager: ManagerCab,
    photographer: PhotographerCab,
    editor: EditorCab,
};

class View{
    constructor() {
        this.container = document.getElementById('app');
    }

    renderSignIn() {
        this.remove();

        this.signIn = new SignIn();
        this.container.append(this.signIn.render());
    }

    renderCab(props) {
        this.remove();

        const { role } = props;

        this.cab = new CABS[role]();
        this.container.append(this.cab.render(props));
    }

    remove() {
        this.container.innerHTML = '';
    }
}

export default View;

// ------------------------- archive -----------------------------

// this.container.append(this.signIn.render());
// this.container.append(this[role].init(props));

// this.cabs = {
//     manager: ManagerCab,
//     photographer: PhotographerCab,
//     editor: EditorCab,
// }

// this.signIn = new SignIn();
// this.manager = new ManagerCab();
// this.photographer = new PhotographerCab();
// this.editor = new EditorCab();
// this.pages = {
//     // signin: () => this.signIn.render(),
//     manager: (orders, previewButtonsListener) => 
//         this.manager.init(this.container, orders, previewButtonsListener),
//     photographer: (orders, previewButtonsListener) => 
//         this.photographer.init(this.container, orders, previewButtonsListener),
//     editor: (orders, previewButtonsListener) => 
//         this.editor.init(this.container, orders, previewButtonsListener),
// }
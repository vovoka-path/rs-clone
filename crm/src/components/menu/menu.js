import menuData from '../../data/menuData.json' assert { type: "json" };
import { createCustomElement, setAttributesElement} from '../../utils/utils.js';

const styles = {
    container: 'menu-container',
    ul: 'menu-items',
    li: 'menu-item',
    a: 'menu-link',
}

const nameAttr = {
    li: 'menu-item-li',
    a: 'menu-item-a',
};

class Menu {
    constructor(cabName) {
        this.cabName = cabName;
        this.container = createCustomElement('div', styles.container);
    }

    render() {
        this.menu = createCustomElement('ul', styles.ul);
        
        for (let [ orderStatus, data ] of Object.entries(menuData[this.cabName])) {
            this.menu.append(this.createMenuElement(orderStatus, data));
        }

        this.container.append(this.menu);

        return this.container;
    }

    createMenuElement(orderStatus, data) {
        const { path, ru } = data;

        this.a = createCustomElement('a', styles.a);
        
        setAttributesElement(this.a, {
            'name': nameAttr.a,
            'href': path,
            'id': orderStatus,
        })
        
        this.innerText = document.createTextNode(ru);
        this.a.appendChild(this.innerText);

        this.li = createCustomElement('li', styles.li);

        setAttributesElement(this.li, {
            'name': nameAttr.li,
            'path': path,
            'id': orderStatus,
        })

        this.li.append(this.a);

        return this.li;
    }
}

export default Menu;

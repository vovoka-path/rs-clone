class List {
    create(className) {
        const ul = document.createElement('ul');
        ul.className = className;

        return ul;
    }
}

export default new List();
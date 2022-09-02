class Conatainer {
    create(className, content = '') {
        const div = document.createElement('div');
        div.className = className;
        div.append(content);

        return div;
    }
}

export default new Conatainer();
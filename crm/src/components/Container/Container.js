class Conatainer {
    create(className, textContent = '') {
        const div = document.createElement('div');
        div.className = className;
        div.innerText = textContent;

        return div;
    }
}

export default new Conatainer();
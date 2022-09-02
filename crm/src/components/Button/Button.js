class Button {
    create(className, innerText, id, handler = () => {}, type = 'button', name = '', ) {
        const btn = document.createElement('button');
        btn.className = className;
        btn.innerText = innerText;
        btn.id = id;
        btn.type = type;
        btn.name = name;

        btn.addEventListener('click', handler);

        return btn;
    }
}

export default new Button();
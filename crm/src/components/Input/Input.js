class Input {
    create(className, type, value, id, placeholder) {
        const input = document.createElement('input');
        input.className = className;
        input.type = type;
        input.value = value;
        input.id = id;
        input.placeholder = placeholder;

        return input;
    }
}

export default new Input();
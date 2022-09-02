class Input {
    create(className, type, value, name, placeholder, textForLabel) {
        const label = document.createElement('label');
        label.for = name;
        label.innerText = textForLabel;
        const input = document.createElement('input');
        input.className = className;
        input.type = type;
        input.value = value;
        input.name = name;
        input.placeholder = placeholder;


        label.append(input);
        return label;
    }
}

export default new Input();
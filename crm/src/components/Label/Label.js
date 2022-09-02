class Label {
    create(forInput, textForLabel) {
        const label = document.createElement('label');
        label.for = forInput;
        label.innerText = textForLabel;

        return label;
    }
}

export default new Label();
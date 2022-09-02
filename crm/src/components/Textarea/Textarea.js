class Textarea {
    create(className, id, placeholder) {
        const textarea = document.createElement('textarea');
        textarea.className = className;
        textarea.id = id;
        textarea.placeholder = placeholder;

        return textarea;
    }
}

export default new Textarea();
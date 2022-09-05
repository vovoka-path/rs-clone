class Paragraph {
    create(className, content) {
        const p = document.createElement('p');
        p.className = className;
        p.innerHTML = content;

        return p;
    }
}

export default new Paragraph();
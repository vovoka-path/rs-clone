class Header {
    create(level, text, className) {
        const header = document.createElement(`h${level}`);
        header.innerText = text;
        header.className = className;

        return header;
    }
}

export default new Header();
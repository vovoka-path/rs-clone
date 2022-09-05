class Link {
    create(className, href, id, text, name){
        const link = document.createElement('a');
        link.className = className;
        link.name = name;
        link.href = href;
        link.id = id;
        link.innerHTML = text;

        return link;
    }
}

export default new Link();
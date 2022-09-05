class ListItem {
    create(className, name, path, orderStatus){
        const li = document.createElement('li');
        li.className = className;
        li.name = name;
        li.setAttribute('path', path);
        li.id = orderStatus;

        return li;
    }
}

export default new ListItem();
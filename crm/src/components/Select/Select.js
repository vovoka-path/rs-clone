class Select {
    create(className, id, options){
        const select = document.createElement('select');
        select.className = className;
        select.id = id;
        options.forEach((o) => {
            const option = document.createElement('option');
            option.innerText = o;
            select.append(option);
        });

        return select;
    }
}

export default new Select();
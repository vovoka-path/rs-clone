class Image {
    create(className, src) {
        const img = document.createElement('img');
        img.className = className;
        img.src = src;

        return img;
    }
}

export default new Image();
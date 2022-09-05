import Label from "../Label/Label.js";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import Container from "../Container/Container.js";
import Select from '../Select/Select.js';

const formData = {
    photographer: {
        labels: 'Ссылка на необработанные фото',
        inputs: 'photographerLink',
    },
    editor: {
        labels: 'Ссылка на обработанные фото',
        inputs: 'editorLink',
    }, 
}

class AddLink {
    constructor(props) {
        this.props = props;
    }

    create() {
        const { role, order, btnAddLinkListener } = this.props;

        const addLinkContainer = Container.create('add-link__container');
        const addLinkBtn = Button.create('add-link__btn', 'Добавить ссылку', order._id, btnAddLinkListener());
        const labels = [formData[role].labels];
        const inputs = [formData[role].inputs];

        labels.forEach((item, i) => {
            const label = Label.create(`add-link-${inputs[i]}`, item);
            const input = Input.create(`add-link__item`, 'text', order[inputs[i]], `add-link-${inputs[i]}`, order[inputs[i]]);
            // console.log('# order[inputs[i] = ', order[inputs[i]], inputs[i]);
            if (!order[inputs[i]]) input.value = ''; // 'Тут должна быть ссылка';
            label.append(input);
            
            addLinkContainer.append(label);
        });

        addLinkContainer.append(addLinkBtn);

        return addLinkContainer;
    }
}

export default AddLink;

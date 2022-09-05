import Label from "../Label/Label.js";
import Header from "../Header/Header.js";
import Button from "../Button/Button.js";
import Container from "../Container/Container.js";
import Textarea from '../Textarea/Textarea.js';
import Paragraph from '../Paragraph/Paragraph.js';

const formData = {
    manager: {
        labels: 'Комментарий для фотографа',
        header: 'Комментарии от обработчика',
        inputs: 'comments',
        from: 'manager',
        to: 'photographer',
    }, 
    photographer: {
        labels: 'Комментарий для обработчика',
        header: 'Комментарии от менеджера',
        inputs: 'comments',
        from: 'photographer',
        to: 'editor',
    },
    editor: {
        labels: 'Комментарий для менеджера',
        header: 'Комментарии от фотографа',
        inputs: 'comments',
        from: 'editor',
        to: 'manager',
    }, 
}

class AddMessage {
    constructor(props) {
        this.props = props;
    }

    create() {
        const { role, order, btnAddMessageListener } = this.props;

        this.addMessageContainer = Container.create('add-message__container');
        const addMessageBtn = Button.create('add-message__btn', 'Добавить', order._id, btnAddMessageListener());
        const labels = [formData[role].labels];
        const inputs = [formData[role].inputs];

        labels.forEach((item, i) => {
            const label = Label.create(`add-message-${inputs[i]}`, item);
            const input = Textarea.create(`add-message__item`, 'add-message', formData[role].labels);
            // const input = Textarea.create(`add-message__item`, 'textarea', order[inputs[i]], `add-message-${inputs[i]}`, order[inputs[i]]);
            label.append(input);
            
            this.addMessageContainer.append(label);
        });

        this.addMessageContainer.append(addMessageBtn);

        if (order.comments.length !== 0 && order.status !== 'incoming') {
            const messagesContainer = Container.create('messages__container');
            const header = Header.create(4, `${formData[role].header}`, 'header-from');
            messagesContainer.append(header);

            const comments = order.comments
            for (let i = comments.length - 1; i >= 0; i--) {
                // console.log('# comment.from, role = ', comment.from, role);
                const comment = comments[i];
                // console.log('# comment = ', comment);
                if (comment.from = role) {
                    const content = `#${i}: ${comment.message}`;
                    const msgContainer = Paragraph.create('message', content)
                    messagesContainer.append(msgContainer);
                }
            }
            // order.comments.forEach((comment) => {
            //     console.log('# comment.from, role = ', comment.from, role);
            //     if (comment.from = role) {
            //         const content = comment.message;
            //         const msgContainer = Paragraph.create('message', content)
            //         messagesContainer.append(msgContainer);
            //     }
            // });

            this.addMessageContainer.append(messagesContainer);
        }

        return this.addMessageContainer;
    }
}

export default AddMessage;

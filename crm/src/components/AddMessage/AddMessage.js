import Label from "../Label/Label.js";
import Header from "../Header/Header.js";
import Button from "../Button/Button.js";
import Container from "../Container/Container.js";
import Textarea from '../Textarea/Textarea.js';
import Paragraph from '../Paragraph/Paragraph.js';
import addMessageData from '../../data/addMessageData.json' assert { type: "json" };

class AddMessage {
    constructor(props) {
        this.props = props;
    }

    create() {
        const { role, order, btnAddMessageListener } = this.props;

        this.addMessageContainer = Container.create('add-message__container');
        const messagesContainer = Container.create('messages__container');

        if (order.comments.length !== 0) {
            

            const allComments = order.comments
            const msgBlocks = addMessageData[role].commentBlocks;

            msgBlocks.forEach((msgBlock, i) => {
                const header = Header.create(4, `${msgBlock.header}`, 'header-msg');
                messagesContainer.append(header);
                
                const comments = allComments.filter((comment) => {
                    return comment.from === msgBlock.from && comment.to === msgBlock.to;
                })

                for (let i = comments.length - 1; i >= 0; i--) {
                    const comment = comments[i];
                    const content = `#${i}: ${comment.message}`;

                    const msgContainer = Paragraph.create('message', content)
                    messagesContainer.append(msgContainer);
                }
            })
            
        }
        let label;

        if (role === 'manager') {
            label = addMessageData[role].commentBlocks[0].label;
            this.renderInputCommentForm(label);
        } else if (role === 'photographer') {
            label = addMessageData[role].commentBlocks[1].label;
            this.renderInputCommentForm(label);
        }

        if (messagesContainer) this.addMessageContainer.append(messagesContainer);

        return this.addMessageContainer;
    }

    renderInputCommentForm(label)  {
        const addMessageBtn = Button.create('add-message__btn', 'Добавить', this.props.order._id, this.props.btnAddMessageListener());

        const labelElement = Label.create(`add-message-label`, label);
        const inputElement = Textarea.create(`add-message__item`, 'add-message', 'Укажите важную информацию...');
        
        labelElement.append(inputElement);
        this.addMessageContainer.append(labelElement);
        this.addMessageContainer.append(addMessageBtn);
    }
}

export default AddMessage;

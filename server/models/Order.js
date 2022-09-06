import mongoose from "mongoose";

const Order = new mongoose.Schema({
    city: {type: String, required: true},
    route: {type: String, required: true},
    package_name: {type: String, required: true},
    clientEmail: {type: String, required: true},
    clientMessage: {type: String, required: true},
    clientPhone: {type: String},
    date: {
        incoming: {type: Date},
        acceptingPhotographer: {type: Date},
        shooting: {type: Date},
        acceptingEditor: {type: Date},
        editing: {type: Date},
        sending: {type: Date},
        completed: {type: Date},
        canceled: {type: Date},
        feedbacks: {type: Date},
    },
    status: {type: String, default: 'incoming'},
    photographerId: {type: String},
    editorId: {type: String},
    photographerLink: {type: String},
    editorLink: {type: String},
    comments: [{
        from: {type: String},
        to: {type: String},
        message: {type: String}
    }]
});

export default mongoose.model('Order', Order);
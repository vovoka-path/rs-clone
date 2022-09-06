const Order = new mongoose.Schema({
    city: {type: String, required: true},
    route: {type: String, required: true},
    package: {type: String, required: true},
    clientEmail: {type: String, required: true},
    clientMessage: {type: String, required: true},
    clientPhone: {type: String},
    date: {
        incomingOrder: {type: Date},
        photographerAppointed: {type: Date},
        photographerAccepted: {type: Date},
        editorAppointed: {type: Date},
        editorAccepted: {type: Date},
        photoCompleted: {type: Date},
        photoSended: {type: Date},
    },
    status: {type: String, default: 'incoming'},
    statusMessages: {
        acceptingPhotographer: {type: String},
        acceptingEditor: {type: String},
        canceled: {type: String}
    },
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
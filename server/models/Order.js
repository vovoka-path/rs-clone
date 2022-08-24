import mongoose from "mongoose";

const Order = new mongoose.Schema({
    city: {type: String, required: true},
    route: {type: String, required: true},
    package: {type: String, required: true},
    clientEmail: {type: String, required: true},
    clientMessage: {type: String, required: true}
});

export default mongoose.model('Order', Order);
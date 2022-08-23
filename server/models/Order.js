import mongoose from "mongoose";

const Order = new mongoose.Schema({
    city: {type: String, required: true},
    route: {type: String, required: true},
    package: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
});

export default mongoose.model('Order', Order);
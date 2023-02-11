import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    status: {type: String},
    name: {type: String},
    email: {type: String},
    role: {type: String, ref: 'Role'}
});

export default mongoose.model('User', User);
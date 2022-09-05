import User from "../models/User.js";

class UserService {
    async update(user){
        if(!user._id) {
            throw new Error('Не указан ID');
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true});
        return updatedUser;
    }

    async delete(id) {
        if(!id) {
            throw new Error('Не указан ID');
        }
        const user = await User.findByIdAndDelete(id);
        return user;
    }
}

export default new UserService();

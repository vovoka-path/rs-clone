import Order from "../models/Order.js";

class OrderService {
    async create(order) {
            const createdOrder = await Order.create(order);
            return createdOrder;
    }

    async getAll() {
            const order = await Order.find();
            return order;
    }

    async getOne(id) {
            if(!id) {
               throw new Error('Не указан ID');
            }
            const order = await Order.findById(id);
            return order;
    }

    async update(order) {
            if(!order._id) {
                throw new Error('Не указан ID');
            }
            const updatedOrder = await Order.findByIdAndUpdate(order._id, order, {new: true});
            return updatedOrder;

    }

    async delete(id) {
            if(!id) {
                throw new Error('Не указан ID');
            }
            const order  = await Order.findByIdAndDelete(id);
            return order;
    }
}

export default new OrderService();
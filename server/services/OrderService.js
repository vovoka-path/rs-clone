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

  async getAllForEmployee(role, idEmployee) {
    let orders;
    switch (role) {
      case "photographer":
        orders = await Order.find({ photographerId: idEmployee });
        break;
      case "editor":
        orders = await Order.find({ editorId: idEmployee });
    }
    return orders;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const order = await Order.findById(id);
    return order;
  }

  async update(order) {
    if (!order._id) {
      throw new Error("Не указан ID");
    }
    const updatedOrder = await Order.findByIdAndUpdate(order._id, order, {
      new: true,
    });
    return updatedOrder;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const order = await Order.findByIdAndDelete(id);
    return order;
  }
}

export default new OrderService();

import OrderService from '../services/OrderService.js';
class OrderController {
    async create(req, res) {
        try {
            const order = await OrderService.create(req.body);
            res.json(order);
        } catch(err) {
            res.status(500).json(err);
        }
    }

    async getAll(req, res) {
        try {
            const order = await OrderService.getAll();
            return res.json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    async getOne(req, res) {
        try {
            const order = await OrderService.getOne(req.params.id);
            return res.json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    async update(req, res) {
        try {
            const order = req.body;
            const updatedOrder = await OrderService.update(order);
            return res.json(updatedOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    async delete(req, res) {
        try {
            const order  = await OrderService.delete(req.params.id);
            return res.json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default new OrderController();
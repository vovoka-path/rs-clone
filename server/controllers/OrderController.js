import OrderService from '../services/OrderService.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { mailSendler } from '../helpers/mailSendler.js';

const {secretKey} = config; 
class OrderController {
    async create(req, res) {
        try {
            const order = await OrderService.create(req.body);
            await mailSendler(order);//добавить функцию которая отправляет клиенту на почту уведомление об успешном заказе
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
    async getAllForEmployee(req, res) {
        try {
            const token = (req.headers.authorization || '').split(' ')[1];
            if(!token) {
                return res.status(403).json({message: 'User not authorized'});
            }
            const { role, id: idEmployee } = jwt.verify(token, secretKey);
            const orders = await OrderService.getAllForEmployee(role, idEmployee);
            return res.json(orders);
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
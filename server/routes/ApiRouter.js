import Router from "express";

import OrderController from "../controllers/OrderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleWare.js";

const router = new Router();

router.post('/orders', OrderController.create);
router.get('/orders', [authMiddleware, roleMiddleware('manager')], OrderController.getAll);
router.get('/orders/employee', OrderController.getAllForEmployee);
router.get('/orders/:id',OrderController.getOne);
router.put('/orders', OrderController.update);
router.delete('/orders/:id', [authMiddleware, roleMiddleware('manager')], OrderController.delete);

export default router;
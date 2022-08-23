import Router from "express";

import OrderController from "../controllers/OrderController.js";

const router = new Router();

router.post('/orders', OrderController.create);
router.get('/orders', OrderController.getAll);
router.get('/orders/:id',OrderController.getOne);
router.put('/orders', OrderController.update);
router.delete('/orders/:id', OrderController.delete);

export default router;
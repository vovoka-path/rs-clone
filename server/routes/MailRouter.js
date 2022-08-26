import Router from "express";
import MailController from "../controllers/MailController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleWare.js";




const router = Router();

router.post('/set', [authMiddleware, roleMiddleware('manager')], MailController.send);

export default router;
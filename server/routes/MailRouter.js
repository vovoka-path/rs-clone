import Router from "express";
import MailController from "../controllers/MailController.js";
import authMiddleware from "../middlewares/authMiddleware.js";




const router = Router();

router.post('/set', authMiddleware, MailController.send);

export default router;
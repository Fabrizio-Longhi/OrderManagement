import {Router} from "express";
import { createOrder, confirmOrder, getOrders, getOrderById } from "../controllers/orderController";

const router = Router()

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById)
router.patch("/:id/confirm",confirmOrder)

export default router;
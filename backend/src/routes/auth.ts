import { Router } from "express";
import { register, login } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware"

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", requireAuth, (req, res) => {
    res.json({user: (req as any).user })
})

export default router

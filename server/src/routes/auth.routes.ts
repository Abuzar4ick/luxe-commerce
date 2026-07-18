import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/send-otp", authController.sendOTPCode);
router.post("/verify-otp", authController.verifyOTPCode);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authMiddleware, authController.logout);

export default router;

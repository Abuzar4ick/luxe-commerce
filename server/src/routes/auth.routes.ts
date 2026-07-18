import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/send-otp", authController.sendOTPCode);
router.post("/verify-otp", authController.verifyOTPCode);

export default router;

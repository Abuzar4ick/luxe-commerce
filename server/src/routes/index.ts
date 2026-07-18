import { Router, Request, Response } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (_: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;

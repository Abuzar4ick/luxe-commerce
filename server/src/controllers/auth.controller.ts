import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/response.js";

export const authController = {
  sendOTPCode: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await authService.sendOTPCode(email);
    success(res, result);
  }),

  verifyOTPCode: asyncHandler(async (req: Request, res: Response) => {
    const { email, otpCode } = req.body;

    const result = await authService.verifyOTPCode(email, otpCode, res);
    success(res, result);
  }),
};

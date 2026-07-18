import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/response.js";
import { badRequest } from "../utils/response.js";

export const authController = {
  sendOTPCode: asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw badRequest("A valid email is required.");
    }

    const result = await authService.sendOTPCode(email);
    success(res, result, 200);
  }),

  verifyOTPCode: asyncHandler(async (req: Request, res: Response) => {
    const { email, otpCode } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw badRequest("A valid email is required.");
    }

    if (!otpCode || typeof otpCode !== "string") {
      throw badRequest("OTP code is required.");
    }

    const result = await authService.verifyOTPCode(email, otpCode, res);
    success(res, result, 200);
  }),

  refreshToken: asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken || typeof refreshToken !== "string") {
      throw badRequest("Refresh token is required.");
    }

    const result = await authService.refreshToken(refreshToken, res);
    success(res, result, 200);
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw badRequest("User context is missing.");
    }

    await authService.logout(userId, res);
    success(res, { message: "Logged out successfully." }, 200);
  }),
};

import type { Response } from "express";
import jwt from "jsonwebtoken";
import { authRepository } from "../repositories/auth.repository.js";
import { sendOTPMessage } from "../emails/emailHandler.js";
import { generateToken } from "../utils/generateToken.js";
import { unauthorized } from "../utils/response.js";
import { ENV } from "../config/env.js";

interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  created_at?: Date;
}

export const authService = {
  sendOTPCode: async (email: string) => {
    await sendOTPMessage(email);

    return { message: "OTP code sent successfully." };
  },

  verifyOTPCode: async (email: string, otpCode: string, res: Response) => {
    const isValidOTP = await authRepository.verifyOTPCode(email, otpCode);
    if (!isValidOTP) {
      throw unauthorized("Invalid OTP code.");
    }

    let user: User | null = await authRepository.getUserByEmail(email);
    if (!user) {
      user = await authRepository.createUser(email);
    }

    await authRepository.deleteOTPCode(email);

    const accessToken = await generateToken(user.id?.toString() || "", res);

    return { message: "OTP code is valid.", accessToken };
  },

  refreshToken: async (refreshToken: string, res: Response) => {
    let payload: { id?: string };

    try {
      payload = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET as string) as {
        id?: string;
      };
    } catch {
      throw unauthorized("Invalid refresh token.");
    }

    if (!payload.id) {
      throw unauthorized("Invalid refresh token payload.");
    }

    const stored = await authRepository.getRefreshToken(payload.id);
    if (!stored || stored !== refreshToken) {
      throw unauthorized("Refresh token not found.");
    }

    const existingUser = await authRepository.getUserById(parseInt(payload.id));
    if (!existingUser) {
      throw unauthorized("User not found.");
    }

    const newAccessToken = jwt.sign(
      { id: payload.id },
      ENV.JWT_ACCESS_SECRET!,
      {
        expiresIn: "15m",
      },
    );

    return { accessToken: newAccessToken };
  },

  logout: async (userId: string, res: Response) => {
    await authRepository.deleteRefreshToken(userId);
    res.clearCookie("refreshToken");
  },
};

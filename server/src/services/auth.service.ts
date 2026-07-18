import type { Response } from "express";
import { authRepository } from "../repositories/auth.repository.js";
import { sendOTPMessage } from "../emails/emailHandler.js";
import { generateToken } from "../utils/generateToken.js";

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
      throw new Error("Invalid OTP code.");
    }

    const user: User | null = await authRepository.getUserByEmail(email);
    if (!user) {
      await authRepository.createUser(email);
    }

    await authRepository.deleteOTPCode(email);

    const accessToken = await generateToken(user?.id?.toString() || "", res);

    return { message: "OTP code is valid.", accessToken };
  },
};

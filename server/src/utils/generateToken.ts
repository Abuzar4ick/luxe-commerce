import jwt from "jsonwebtoken";
import type { Response } from "express";
import { ENV } from "../config/env.js";
import { authRepository } from "../repositories/auth.repository.js";

// Generate access and refresh JWT tokens
export const generateToken = async (userId: string, role: string, res: Response) => {
  if (!ENV.JWT_ACCESS_SECRET || !ENV.JWT_REFRESH_SECRET) {
    throw {
      status: 500,
      message:
        "JWT_ACCESS_SECRET or JWT_REFRESH_SECRET is not defined in environment variables",
    };
  }

  const accessToken = jwt.sign({ id: userId, role }, ENV.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: userId, role }, ENV.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // Store the refresh token in Redis with a 7-day expiration
  await authRepository.storeRefreshToken(userId, refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return accessToken;
};

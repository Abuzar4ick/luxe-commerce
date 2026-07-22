import pool from "../config/db.js";
import { redisClient } from "../config/redis.js";

interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  role: "user" | "admin";
  created_at?: Date;
}

export const authRepository = {
  createUser: async (email: string): Promise<User> => {
    const query = `INSERT INTO users (email) VALUES ($1) RETURNING *`;
    const result = await pool.query<User>(query, [email]);

    return result.rows[0];
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    return result.rows[0] ?? null;
  },

  getUserById: async (id: number): Promise<User | null> => {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );

    return result.rows[0] ?? null;
  },

  // Redis operations for OTP codes and refresh tokens

  storeOTPCode: async (email: string, otpCode: string): Promise<void> => {
    await redisClient.setEx(email, 300, otpCode);
  },

  verifyOTPCode: async (email: string, otpCode: string): Promise<boolean> => {
    const storedOTP = await redisClient.get(email);
    return storedOTP === otpCode;
  },

  deleteOTPCode: async (email: string): Promise<void> => {
    await redisClient.del(email);
  },

  storeRefreshToken: async (
    userId: string,
    refreshToken: string,
  ): Promise<void> => {
    await redisClient.set(userId, refreshToken, { EX: 7 * 24 * 60 * 60 });
  },

  getRefreshToken: async (userId: string): Promise<string | null> => {
    return await redisClient.get(userId);
  },

  deleteRefreshToken: async (userId: string): Promise<void> => {
    await redisClient.del(userId);
  },
};

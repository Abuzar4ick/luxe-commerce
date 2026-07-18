/// <reference path="../../types/globals.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { unauthorized } from "../utils/response.js";

interface JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return next(unauthorized("Access token is missing"));
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET!) as JwtPayload;
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(unauthorized("Token expired or invalid"));
  }
};

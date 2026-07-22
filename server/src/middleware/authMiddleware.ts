/// <reference path="../../types/globals.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { unauthorized, forbidden } from "../utils/response.js";

interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return next(unauthorized("Not authenticated."));
  }

  try {
    req.user = jwt.verify(token, ENV.JWT_ACCESS_SECRET as string) as JwtPayload;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return next(unauthorized("Token expired or invalid"));
  }
};

export const requireAdmin = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return next(forbidden("Admin access required."));
  }
  next();
};

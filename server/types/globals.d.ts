declare global {
  namespace Express {
    interface Request {
      cookies?: { [key: string]: string };
      user?: {
        id: string;
        role: "user" | "admin"
      };
    }
  }
}

export {};
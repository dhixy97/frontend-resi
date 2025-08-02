import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "PGVU2QNPHMK8BZNAMM4DSL49AU5J39YL";

export interface AuthPayload {
  id: string;
  role: "admin" | "user";
  username: string;
}

export function verifyToken(req: NextRequest): AuthPayload | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET) as AuthPayload;
    return decoded;
  } catch (err) {
    console.error("JWT Error:", err);
    return null;
  }
}

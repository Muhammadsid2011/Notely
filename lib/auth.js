import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_NAME = "token";

export const hashPassword = (password) => bcrypt.hash(password, 10);
export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

export const getTokenFromRequest = (request) => request.cookies.get(TOKEN_NAME)?.value;

export const getClearAuthCookieOptions = () => ({
  ...getAuthCookieOptions(),
  maxAge: 0,
  expires: new Date(0),
});

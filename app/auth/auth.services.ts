import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userSchema from '../user/user.schema';
import { IUser } from '../user/user.dto';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_refresh_secret";

/**
 * Get a user by email
 * @param {string} email - The email address of the user to find
 * @returns {Promise<IUser | null>} The user found, or null if no user is found
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return userSchema.findOne({ email });
};

/**
 * Fetches a user by their ID.
 * 
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<typeof userSchema | null>} - The user document if found, otherwise null.
 */
export const getUserById = async (id: string): Promise<typeof userSchema | null> => {
  return userSchema.findById(id).lean();
};

/**
 * Generates access and refresh tokens for authentication.
 * 
 * @param {string} _id - The unique ID of the user.
 * @param {string} email - The email of the user.
 * @returns {{ accessToken: string, refreshToken: string }} - The generated access and refresh tokens.
 */
export const createTokens = (_id: string, email: string): { accessToken: string; refreshToken: string; } => {
  const accessToken = jwt.sign({ id: _id, email }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: _id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

/**
 * Verifies the validity of a refresh token.
 * 
 * @param {string} token - The refresh token to verify.
 * @returns {string | jwt.JwtPayload} - The decoded token payload if valid.
 * @throws {jwt.JsonWebTokenError} - If the token is invalid or expired.
 */
export const verifyRefreshToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, REFRESH_SECRET);
};


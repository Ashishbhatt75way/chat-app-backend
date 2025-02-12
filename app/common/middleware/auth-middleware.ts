import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use an environment variable

export interface AuthenticatedRequest extends Request {
  user?: any; // Define a proper user type based on your user model
}

/**
 * Middleware to authenticate a request using a JWT token.
 *
 * Checks if the request has an authorization header with a valid JWT token.
 * If the token is valid, it attaches the user data to the request and calls the next middleware.
 * If the token is invalid or missing, it throws an error which is handled by the global error handler.
 *
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @param {NextFunction} next - The next middleware function in the stack
 */
export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

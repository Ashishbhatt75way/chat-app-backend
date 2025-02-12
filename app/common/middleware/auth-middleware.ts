import passport from "passport";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to authenticate a request using JWT strategy.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @throws {Error} - If an error occurs during authentication.
 * 
 * @returns {void} - Sends a 401 response if authentication fails,
 * or calls the next middleware if successful.
 */

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate("jwt", { session: false }, (err: any, user: Express.User | undefined) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

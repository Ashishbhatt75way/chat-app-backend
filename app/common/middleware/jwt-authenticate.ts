import { NextFunction, Request, Response } from 'express';
import passport from "passport";
import { IUser } from '../../user/user.dto';

/**
 * Authenticates a request using JWT strategy.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} - Sends a response with an error message if authentication fails,
 * or calls the next middleware if successful.
 */

export const jwtAuthenticate = (req:Request, res:Response, next:NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: IUser, info: any) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    if (!user) return res.status(401).json({ message: "Unauthorized", info });

    req.user = user;
    next();
  })(req, res, next);
};

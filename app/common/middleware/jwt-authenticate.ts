import { NextFunction, Request, Response } from 'express';
import passport from "passport";
import { IUser } from '../../user/user.dto';

export const jwtAuthenticate = (req:Request, res:Response, next:NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: IUser, info: any) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });

    if (!user) return res.status(401).json({ message: "Unauthorized", info });

    req.user = user;
    next();
  })(req, res, next);
};

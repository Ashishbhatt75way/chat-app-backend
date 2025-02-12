import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../user/user.dto';
import * as authService from './auth.services';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

/**
 * Handles user login and generates access & refresh tokens.
 *
 * @function login
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} - A promise that resolves when login is complete.
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'login',
    { session: false },
    async (err: any, user: IUser, info: { message?: string }) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      if (!user) {
        return res.status(401).json({ message: info?.message || 'Invalid credentials' });
      }

      try {
        req.login(user, { session: false }, async (error) => {
          if (error) {
            return res.status(500).json({ message: 'Server error' });
          }

          const { _id, email } = user;
          if (!_id || !email) {
            return res.status(500).json({ message: 'Invalid user data' });
          }

          const tokens = authService.createTokens(_id.toString(), email);
          return res.json({ user, tokens });
        });
      } catch (error) {
        return res.status(500).json({ message: 'Authentication error' });
      }
    }
  )(req, res, next);
};

/**
 * Refreshes a user's tokens.
 *
 * @function refreshToken
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *
 * @returns {Promise<void>} - A promise that resolves when tokens are refreshed.
 */
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = authService.verifyRefreshToken(refreshToken) as JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user :any= await authService.getUserById(decoded.id.toString());

    if (!user || !user.email) {
      return res.status(401).json({ message: 'User not found or token is invalid' });
    }

    const tokens = authService.createTokens(decoded.id, user.email);
    return res.json(tokens);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

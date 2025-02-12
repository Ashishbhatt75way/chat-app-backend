import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import process from "process";
import { type IUser } from "../../user/user.dto";

/**
 * Middleware to handle role-based authorization for routes.
 *
 * This middleware checks if the request's user role is authorized to access the
 * route. It verifies JWT tokens, checks user roles, and compares them against
 * the allowed roles.
 *
 * @param {IUser['role']} roles - The roles that are allowed to access the route.
 * @param {string[]} [publicRoutes=[]] - An array of route paths that are publicly accessible
 * and do not require authentication.
 *
 * @returns {Function} An express middleware function that handles role-based authorization.
 *
 * @throws {createHttpError} Throws a 401 error if the token is invalid, if the user role
 * is null or unauthorized, or if the user role is not included in the allowed roles.
 */

export const roleAuth = (
  roles: IUser['role'],
  publicRoutes: string[] = []
) =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (publicRoutes.includes(req.path)) {
        next();
        return;
      }
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw createHttpError(401, {
          message: `Invalid token`,
        });
      }

      const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decodedUser as IUser;
      const user = req.user as IUser;
      if (user.role == null || ['ADMIN', 'USER'].includes(user.role)) {
        throw createHttpError(401, { message: "Invalid user role" });
      }
      if (!roles.includes(user.role)) {
        const type =
          user.role.slice(0, 1) + user.role.slice(1).toLocaleLowerCase();

        throw createHttpError(401, {
          message: `${type} can not access this resource`,
        });
      }
      next();
    }
  );

import { type ErrorRequestHandler } from "express";
import { type ErrorResponse } from "../helper/response.hepler";

/**
 * Error handler middleware to catch all errors and send a formatted error response.
 * @param {Error} err - The error that occurred.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: ErrorResponse = {
    success: false,
    error_code: (err?.status ?? 500) as number,
    message: (err?.message ?? "Something went wrong!") as string,
    data: err?.data ?? {},
  };

  res.status(response.error_code).send(response);
  next();
};

export default errorHandler;

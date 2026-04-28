import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    err.message = `Resource not found. Invalid: ${err.message}`;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;

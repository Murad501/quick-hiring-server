/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";

import { ZodError } from "zod";
import handleZodValidationError from "../../errors/handleZodValidationError";
import handleCastError from "../../errors/handleCastError";
import logger from "../../helpers/logger";

type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

// global error handler
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.env === "development"
    ? console.log(`global error handler~~~`, error)
    : logger.error(`global error handler~~~`, error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simpliFiedError = handleValidationError(error);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorMessages = simpliFiedError?.errorMessages;
  } else if (error?.name === "CastError") {
    const simpliFiedError = handleCastError(error);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorMessages = simpliFiedError?.errorMessages;
  } else if (error instanceof ZodError) {
    const zodError = handleZodValidationError(error);
    statusCode = zodError?.statusCode;
    message = zodError?.message;
    errorMessages = zodError?.errorMessages;
  } else if (error?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "jwt expired";
    errorMessages = [
      {
        path: "",
        message: "jwt expired",
      },
    ];
  } else if (error?.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    errorMessages = [
      {
        path: "",
        message: "Invalid token",
      },
    ];
  } else if (error?.name === "NotBeforeError") {
    statusCode = 401;
    message = "Token not active";
    errorMessages = [
      {
        path: "",
        message: "Token not active",
      },
    ];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  if (statusCode === 401 || statusCode === 403) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined,
  });
};

export default globalErrorHandler;

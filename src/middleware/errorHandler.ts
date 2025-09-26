import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import AppError from '../utils/appError.js';
import logger from '../utils/logger.js';
import appConfig from '../config/appConfig.js';

interface errResponse {
	success: boolean;
	statusCode: number;
	message: string;
	err?: string;
}

/**
 * Express global error-handling middleware.
 *
 * Logs encountered errors and sends a structured JSON error response.
 *
 * Handles both custom AppError instances and general Errors.
 * In non-production, attaches stack trace information for debugging.
 *
 * @param {unknown} err - The error object passed from previous middleware or routes.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void}
 */

const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
	logger.error(err);

	let status = 500;
	let message = 'something went wrong';
	let errStack: string | undefined;

	if (err instanceof AppError) {
		status = err.httpStatus;
		message = err.message;
		errStack = appConfig.nodeEnv !== `production` && err.stack ? err.stack : '';
	}

	if (err instanceof Error) {
		message = err.message;
		errStack = appConfig.nodeEnv !== `production` && err.stack ? err.stack : '';
	}

	let handlerRes: errResponse = {
		success: false,
		statusCode: status,
		message: message,
		err: errStack,
	};

	res.status(handlerRes.statusCode).json(handlerRes);
};

export default errorHandler;

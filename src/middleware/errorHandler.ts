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

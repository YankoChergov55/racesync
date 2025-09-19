import pinoHttp from 'pino-http';
import logger from '../utils/logger.js';
import type { Request, Response } from 'express';

const httpLogger = pinoHttp.default({
	logger,
	customSuccessMessage: function (req: Request, res: Response) {
		return `${req.method} ${req.url} completed with ${res.statusCode}`;
	},
	customErrorMessage: function (req: Request, res: Response, err: string | object | unknown) {
		return `${req.method} ${req.url} failed with code:${res.statusCode} and error: ${err}`;
	},
});

export default httpLogger;

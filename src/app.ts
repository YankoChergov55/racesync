import express from 'express';
import type { Express } from 'express';
import { V1 } from './routes.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

/**
 * Creates and configures an Express application instance.
 *
 * @returns {Express} Configured Express app instance.
 */
export function eapp(): Express {
	const app = express();

	app.use(express.json());
	app.use(cookieParser());

	app.use('/api/v1', V1);

	app.use(errorHandler);

	return app;
}

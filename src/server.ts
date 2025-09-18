import { eapp } from './app.js';
import logger from './utils/logger.js';
import appConfig from './config/appConfig.js';
import { Server } from 'http';

const app = eapp();

app.get('/', (req, res) => {
	res.json({
		message: 'welcome to event vault',
	});
});

const server: Server = app.listen(appConfig.port, () => {
	logger.info(`Server running on port ${appConfig.port}`);
});

process.on('SIGTERM', () => {
	server.close();
	process.exit();
});

process.on('SIGINT', () => {
	server.close();
	process.exit();
});

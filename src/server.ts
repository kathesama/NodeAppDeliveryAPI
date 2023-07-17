import express from 'express';
import indexRoute from '@routes/index';
import config from './config';
import process from 'process';
import { middlewareConfig } from './middlewares';
import { logger } from './middlewares/logger.config';

const app = express();

middlewareConfig(app);

app.use('/', indexRoute);

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}, Process: ${process.pid} running on ${config.NODE_ENV} mode`);
});

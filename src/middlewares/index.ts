import express, { type Express } from 'express';

import { fingerprint } from './fingerprint.middleware';
import { bodyParser } from './bodyParser.middleware';
import { urlEncoded } from './urlEncoded.middleware';
import cors from 'cors';
import { helmet } from './helmet.middleware';
import logger from 'morgan';

export * from './bodyParser.middleware';
export * from './urlEncoded.middleware';
export * from './cors.middleware';
export * from './helmet.middleware';
export * from './fingerprint.middleware';

const middlewareConfig = (app: Express): void => {
  app.use(fingerprint);
  app.use(bodyParser);
  app.use(urlEncoded);
  app.use(cors({ origin: '*', credentials: true }));
  app.use(helmet());

  app.use(logger('dev'));
  app.disable('x-powered-by');

  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.status ?? 500).send(err.stack);
  });
};

export { middlewareConfig };

import Fingerprint from 'express-fingerprint';
import config from '../config';

const fingerPrint: any = Fingerprint;

const fingerprintMiddleware = (req: any, res: any, next: any): any => {
  const headers = req.headers;
  const params: any = {
    parameters: [
      // Defaults
      fingerPrint.acceptHeaders,

      // personalized params
      (next: any) => {
        next(null, {
          useragent: req.headers['user-agent'],
        });
      },
      /* disabled for development
      (next: any) => {
         next(null, {
           acceptLanguage: req.headers['accept-language'],
        });
       }, */
      (next: any) => {
        next(null, {
          id: req.ip,
        });
      },
      (next: any) => {
        next(null, {
          fingerKey: config.SERVER_FINGERKEY,
        });
      },
    ],
  };

  return Fingerprint(params)(req, res, next);
};

export const fingerprint = fingerprintMiddleware;

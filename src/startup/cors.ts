import cors, { CorsOptions } from 'cors';
import { Application } from 'express';

export const corsConfig = (app: Application) => {
  const allowedOrigins = [
    // LOCAL
    'http://localhost:3000',
  ];

  const corsOptions = {
    origin: function (origin: string, callback: any) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin ' +
          origin;

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
    exposeHeaders: ['set-cookie'],
  };

  app.use(cors(corsOptions as CorsOptions));
};

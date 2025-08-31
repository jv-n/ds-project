import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import path from 'path';
import routes from './routes';
import swaggerDocument from './docs';
import { requestHandler, errorHandler, requestLogger } from './middlewares';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8005',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const uploadsPath = path.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));
app.use(
  expressWinston.logger({ winstonInstance: requestLogger, statusLevels: true }),
);
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);
app.use(requestHandler);
app.use(expressWinston.errorLogger({ winstonInstance: requestLogger }));

export default app;

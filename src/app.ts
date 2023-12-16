import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, HOST_NAME } from '@config';
import { DB } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    console.log(this.port);
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on http://${HOST_NAME}:${this.port}`);
      logger.info(`🚀 API Spec http://${HOST_NAME}:${this.port}/api-docs`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize
      .sync({ alter: true })
      .then(() => {
        logger.info('Database connected!');
      })
      .catch(err => {
        // logger.error(err);
        console.log(err);
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream })); // logging
    this.app.use(cors()); // security
    this.app.use(compression()); // performance
    this.app.use(express.json()); // parsing json request payload to body
    this.app.use(express.urlencoded({ extended: true })); // parsing urlencoded request payload to body
    this.app.use(cookieParser()); // parsing cookie to object
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router); // register routes
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'BnB API Specification',
          version: '1.0.0',
          description: 'Beauty in bloom API Specification, e-commerce website for e-shopping model',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}

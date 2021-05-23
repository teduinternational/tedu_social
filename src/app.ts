import HerokuLogger from 'heroku-logger';
import { Logger } from '@core/utils';
import { Route } from '@core/interfaces';
import YAML from 'yamljs';
import cors from 'cors';
import { errorMiddleware } from '@core/middleware';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import socketIo from 'socket.io';
import swaggerUi from 'swagger-ui-express';

class App {
  public port: string | number;
  public production: boolean;
  public app: express.Application;
  public server: http.Server;
  public io: socketIo.Server;

  constructor(routes: Route[]) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server);

    this.port = process.env.PORT || 15000;
    this.production = process.env.NODE_ENV == 'production' ? true : false;

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorMiddleware();
    this.initializeSwagger();
    this.initSocketIo();
  }
  private initSocketIo() {
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server, {
      cors: {
        origin: '*',
      },
    });
    this.app.set('socketio', this.io);

    const users: any = {};
    this.io.on('connection', (socket: socketIo.Socket) => {
      Logger.warn('a user connected : ' + socket.id);
      socket.emit('message', 'Hello ' + socket.id);

      socket.on('login', function (data) {
        Logger.warn('a user ' + data.userId + ' connected');
        // saving userId to object with socket ID
        users[socket.id] = data.userId;
      });

      socket.on('disconnect', function () {
        Logger.warn('user ' + users[socket.id] + ' disconnected');
        // remove saved socket from users object
        delete users[socket.id];
        Logger.warn('socket disconnected : ' + socket.id);
      });
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      Logger.info(`Server is listening on port ${this.port}`);
      HerokuLogger.info(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeMiddleware() {
    if (this.production) {
      // this.app.use(hpp());
      // this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(cors({ origin: 'social-admin-prod.herokuapp.com', credentials: true }));
    } else {
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  private connectToDatabase() {
    const connectString = process.env.MONGODB_URI;
    if (!connectString) {
      Logger.error('Connection string is invalid');
      HerokuLogger.error(`Connection string is invalid`);
      return;
    }
    mongoose
      .connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .catch((reason) => {
        Logger.error(reason);
      });
    Logger.info('Database connected...');
    HerokuLogger.info(`Database connected...`);
  }

  private initializeSwagger() {
    const swaggerDocument = YAML.load('./src/swagger.yaml');

    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default App;

import AuthController from './auth.controller';
import { Route } from '@core/interfaces';
import { Router } from 'express';

export default class AuthRoute implements Route {
  public path = '/api/auth';
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.authController.login); //POST: http://localhost:5000/api/auth
  }
}

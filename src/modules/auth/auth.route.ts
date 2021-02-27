import AuthController from './auth.controller';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import { authMiddleware } from '@core/middleware';

export default class AuthRoute implements Route {
  public path = '/api/v1/auth';
  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.authController.login); //POST: http://localhost:5000/api/auth
    this.router.post(this.path + '/refresh-token', this.authController.refreshToken);
    this.router.post(this.path + '/revoke-token', authMiddleware, this.authController.revokeToken);

    this.router.get(this.path, authMiddleware, this.authController.getCurrentLoginUser); //GET: http://localhost:5000/api/auth --> Require login
  }
}

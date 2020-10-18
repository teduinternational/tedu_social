import RegisterDto from './dtos/register.dto';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import UsersController from './users.controller';
import validationMiddleware from '@core/middleware/validation.middleware';

export default class UsersRoute implements Route {
  public path = '/api/users';
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(RegisterDto, true),
      this.usersController.register
    ); //POST: http://localhost:5000/api/users
  }
}

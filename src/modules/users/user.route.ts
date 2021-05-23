import RegisterDto from './dtos/register.dto';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import UsersController from './users.controller';
import { authMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';

export default class UsersRoute implements Route {
  public path = '/api/v1/users';
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(RegisterDto, true), this.usersController.register);

    this.router.put(
      this.path + '/:id',
      authMiddleware,
      validationMiddleware(RegisterDto, true),
      this.usersController.updateUser,
    );

    this.router.get(this.path + '/:id', this.usersController.getUserById);

    this.router.get(this.path, this.usersController.getAll);

    this.router.get(this.path + '/paging/:page', this.usersController.getAllPaging);

    this.router.delete(this.path + '/:id', authMiddleware, this.usersController.deleteUser);

    this.router.delete(this.path, authMiddleware, this.usersController.deleteUsers);
  }
}

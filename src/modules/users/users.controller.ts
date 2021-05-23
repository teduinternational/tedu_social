import { NextFunction, Request, Response } from 'express';

import RegisterDto from './dtos/register.dto';
import { TokenData } from '@modules/auth';
import UserService from './users.service';

export default class UsersController {
  private userService = new UserService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: RegisterDto = req.body;
      const tokenData: TokenData = await this.userService.createUser(model);
      const io = req.app.get('socketio');
      io.emit('user_created', `${model.email} has been registered`);
      res.status(201).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getAllPaging = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.params.page);
      const keyword = req.query.keyword || '';

      const paginationResult = await this.userService.getAllPaging(keyword.toString(), page);
      res.status(200).json(paginationResult);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: RegisterDto = req.body;
      const user = await this.userService.updateUser(req.params.id, model);
      const io = req.app.get('socketio');
      io.emit('user_updated', `User ${model.email} has been updated.`);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.deleteUser(req.params.id);
      const io = req.app.get('socketio');
      io.emit('user_deleted', `User ${result.email} has been deleted.`);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids: string[] = req.body;
      const result = await this.userService.deleteUsers(ids);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

import IndexController from './index.controller';
import { Route } from '@core/interfaces';
import { Router } from 'express';

export default class IndexRoute implements Route {
  public path = '/';
  public router = Router();

  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.indexController.index);
  }
}

import CreatePostDto from './dtos/create_post.dto';
import PostsController from './posts.controller';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import { authMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';

export default class PostsRoute implements Route {
  public path = '/api/v1/posts';
  public router = Router();

  public usersController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.usersController.createPost
    );

    this.router.put(
      this.path + '/:id',
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.usersController.updatePost
    );
  }
}

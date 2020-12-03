import CreatePostDto from './dtos/create_post.dto';
import PostsController from './posts.controller';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import { authMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';

export default class PostsRoute implements Route {
  public path = '/api/v1/posts';
  public router = Router();

  public postController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.postController.createPost
    );

    this.router.put(
      this.path + '/:id',
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.postController.updatePost
    );

    this.router.get(this.path, this.postController.getAllPosts);
    this.router.get(this.path + '/:id', this.postController.getPostById);
    this.router.get(
      this.path + '/paging/:page',
      this.postController.getAllPaging
    );
  }
}

import CreateCommentDto from './dtos/create_comment.dto';
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

    this.router.delete(
      this.path + '/:id',
      authMiddleware,
      this.postController.deletePost
    );

    this.router.post(
      this.path + '/like/:id',
      authMiddleware,
      this.postController.likePost
    );
    this.router.delete(
      this.path + '/like/:id',
      authMiddleware,
      this.postController.unlikePost
    );

    this.router.post(
      this.path + '/comments/:id',
      authMiddleware,
      validationMiddleware(CreateCommentDto, true),
      this.postController.addComment
    );
    this.router.delete(
      this.path + '/comments/:id/:comment_id',
      authMiddleware,
      this.postController.removeComment
    );

    this.router.post(
      this.path + '/shares/:id',
      authMiddleware,
      this.postController.sharePost
    );
    this.router.delete(
      this.path + '/shares/:id',
      authMiddleware,
      this.postController.removeSharePost
    );
  }
}

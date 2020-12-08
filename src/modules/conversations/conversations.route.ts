import ConversationsController from './conversations.controller';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import SendMessageDto from './dtos/send_message.dto';
import { authMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';

export default class ConversationsRoute implements Route {
  public path = '/api/v1/conversations';
  public router = Router();

  public conversationController = new ConversationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Group
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(SendMessageDto, true),
      this.conversationController.sendMessage
    );

    this.router.get(
      this.path,
      authMiddleware,
      this.conversationController.getMyConversation
    );
  }
}

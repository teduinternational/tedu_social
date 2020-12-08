import ConversationSchema from './conversations.model';
import { HttpException } from '@core/exceptions';
import { IConversation } from './conversations.interface';
import { IMessage } from './conversations.interface';
import SendMessageDto from './dtos/send_message.dto';
import { UserSchema } from '@modules/users';

export default class ConversationService {
  public async sendMessage(
    userId: string,
    dto: SendMessageDto
  ): Promise<IConversation> {
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const toUser = await UserSchema.findById(dto.to).select('-password').exec();
    if (!toUser) throw new HttpException(400, 'To user id is not exist');

    if (!dto.conversationId) {
      let newConversation = await ConversationSchema.findOne({
        $or: [
          { $and: [{ user1: userId }, { user2: dto.to }] },
          { $and: [{ user1: dto.to }, { user2: userId }] },
        ],
      }).exec();
      if (newConversation) {
        newConversation.messages.unshift({
          to: dto.to,
          text: dto.text,
          from: userId,
        } as IMessage);
      } else {
        newConversation = new ConversationSchema({
          user1: userId,
          user2: dto.to,
          messages: [
            {
              from: userId,
              to: dto.to,
              text: dto.text,
            },
          ],
        });
      }

      await newConversation.save();
      return newConversation;
    } else {
      const conversation = await ConversationSchema.findById(
        dto.conversationId
      ).exec();

      if (!conversation) {
        throw new HttpException(400, 'Conversation id is not exist');
      }
      if (
        (conversation.user1 !== userId && conversation.user2 !== dto.to) ||
        (conversation.user1 !== dto.to && conversation.user2 !== userId)
      ) {
        throw new HttpException(400, 'Conversation id is not valid');
      }
      conversation.messages.unshift({
        to: dto.to,
        text: dto.text,
        from: userId,
      } as IMessage);
      await conversation.save();
      return conversation;
    }
  }

  public async getMyConversation(userId: string): Promise<IConversation[]> {
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const conversations = await ConversationSchema.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .sort({ recent_date: -1 })
      .exec();
    return conversations;
  }
}

import CreatePostDto from './dtos/create_post.dto';
import { HttpException } from '@core/exceptions';
import { IPost } from './posts.interface';
import { PostSchema } from '.';
import { UserSchema } from '@modules/users';

export default class PostService {
  public async createPost(
    userId: string,
    postDto: CreatePostDto
  ): Promise<IPost> {
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const newPost = new PostSchema({
      text: postDto.text,
      name: user.first_name + ' ' + user.last_name,
      avatar: user.avatar,
      user: userId,
    });
    const post = await newPost.save();
    return post;
  }

  public async updatePost(
    postId: string,
    postDto: CreatePostDto
  ): Promise<IPost> {
    const updatePostById = await PostSchema.findByIdAndUpdate(
      postId,
      {
        ...postDto,
      },
      { new: true }
    ).exec();

    if (!updatePostById) throw new HttpException(400, 'Post is not found');

    return updatePostById;
  }
}

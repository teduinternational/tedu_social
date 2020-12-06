import CreateGroupDto from './dtos/create_group.dto';
import GroupSchema from './groups.model';
import { HttpException } from '@core/exceptions';
import { IGroup } from './groups.interface';
import { UserSchema } from '@modules/users';

export default class GroupService {
  public async createGroup(
    userId: string,
    groupDto: CreateGroupDto
  ): Promise<IGroup> {
    const user = await UserSchema.findById(userId).select('-password').exec();
    if (!user) throw new HttpException(400, 'User id is not exist');

    const existingGroup = await GroupSchema.find({
      $or: [{ name: groupDto.name }, { code: groupDto.code }],
    }).exec();
    if (existingGroup.length > 0)
      throw new HttpException(400, 'Name or code existed');

    const newGroup = new GroupSchema({
      ...groupDto,
    });
    const post = await newGroup.save();
    return post;
  }

  public async getAllGroup(): Promise<IGroup[]> {
    const groups = GroupSchema.find().exec();
    return groups;
  }
}

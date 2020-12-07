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

  public async updateGroup(
    groupId: string,
    groupDto: CreateGroupDto
  ): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, 'Group id is not exist');

    const existingGroup = await GroupSchema.find({
      $and: [
        { $or: [{ name: groupDto.name }, { code: groupDto.code }] },
        { _id: { $ne: groupId } },
      ],
    }).exec();

    if (existingGroup.length > 0)
      throw new HttpException(400, 'Name or code existed');

    const groupFields = { ...groupDto };

    const updatedGroup = await GroupSchema.findOneAndUpdate(
      { _id: groupId },
      { $set: groupFields },
      { new: true }
    ).exec();

    if (!updatedGroup) throw new HttpException(400, 'Update is not success');

    return updatedGroup;
  }

  public async deleteGroup(groupId: string): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, 'Group id is not exist');

    const deletedGroup = await GroupSchema.findOneAndDelete({
      _id: groupId,
    }).exec();
    if (!deletedGroup) throw new HttpException(400, 'Update is not success');

    return deletedGroup;
  }
}

import { IProfile, ISocial } from './profile.interface';
import { IUser, UserSchema } from '@modules/users';

import CreateProfileDto from './dtos/create_profile.dto';
import { HttpException } from '@core/exceptions';
import ProfileSchema from './profile.model';
import normalize from 'normalize-url';

class ProfileService {
  public async getCurrentProfile(userId: string): Promise<Partial<IUser>> {
    const user = await ProfileSchema.findOne({
      user: userId,
    })
      .populate('user', ['name', 'avatar'])
      .exec();
    if (!user) {
      throw new HttpException(400, 'There is no profile for this user');
    }
    return user;
  }
  public async createProfile(
    userId: string,
    profileDto: CreateProfileDto
  ): Promise<IProfile> {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = profileDto;

    const profileFields: Partial<IProfile> = {
      user: userId,
      company,
      location,
      website:
        website && website != ''
          ? normalize(website.toString(), { forceHttps: true })
          : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill: string) => ' ' + skill.trim()),
      status,
    };

    const socialFields: ISocial = {
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key] = normalize(value, { forceHttps: true });
      }
    }
    profileFields.social = socialFields;

    const profile = await ProfileSchema.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).exec();

    return profile;
  }

  public async deleteProfile(userId: string) {
    // Remove profile
    await ProfileSchema.findOneAndRemove({ user: userId }).exec();
    // Remove user
    await UserSchema.findOneAndRemove({ _id: userId }).exec();
  }

  public async getAllProfiles(): Promise<Partial<IUser>[]> {
    const profiles = await ProfileSchema.find()
      .populate('user', ['name', 'avatar'])
      .exec();
    return profiles;
  }
}
export default ProfileService;

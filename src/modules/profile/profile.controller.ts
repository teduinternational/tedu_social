import { NextFunction, Request, Response } from 'express';

import CreateProfileDto from './dtos/create_profile.dto';
import { IProfile } from './profile.interface';
import { IUser } from '@modules/users';
import ProfileService from './profile.service';

class ProfileController {
  private profileService = new ProfileService();

  public getCurrentProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.id;
      const resultObj: Partial<IUser> = await this.profileService.getCurrentProfile(
        userId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public getByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;
    try {
      const updateUserData: Partial<IUser> = await this.profileService.getCurrentProfile(
        userId
      );
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getAllProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resultObj: Partial<IUser>[] = await this.profileService.getAllProfiles();
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateProfileDto = req.body;
    const userId = req.user.id;
    try {
      const createUserData: IProfile = await this.profileService.createProfile(
        userId,
        userData
      );
      res.status(201).json({ data: createUserData });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;

    try {
      await this.profileService.deleteProfile(userId);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };
}
export default ProfileController;

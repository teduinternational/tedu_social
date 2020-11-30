import { authMiddleware, validationMiddleware } from '@core/middleware';

import CreateProfileDto from './dtos/create_profile.dto';
import ProfileController from './profile.controller';
import { Profiler } from 'winston';
import { Route } from '@core/interfaces';
import { Router } from 'express';

class ProfileRoute implements Route {
  public path = '/api/v1/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.profileController.getAllProfiles);
    this.router.get(
      `${this.path}/user/:id`,
      this.profileController.getByUserId
    );
    this.router.get(
      `${this.path}/me`,
      authMiddleware,
      this.profileController.getCurrentProfile
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateProfileDto),
      this.profileController.createProfile
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.profileController.deleteProfile
    );
  }
}

export default ProfileRoute;

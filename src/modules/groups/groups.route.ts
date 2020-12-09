import CreateGroupDto from './dtos/create_group.dto';
import GroupsController from './groups.controllers';
import { Route } from '@core/interfaces';
import { Router } from 'express';
import SetManagerDto from './dtos/set_manager.dto';
import { authMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';

export default class GroupsRoute implements Route {
  public path = '/api/v1/groups';
  public router = Router();

  public groupsController = new GroupsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Group
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateGroupDto, true),
      this.groupsController.createGroup
    );

    this.router.put(
      this.path + '/:id',
      authMiddleware,
      validationMiddleware(CreateGroupDto, true),
      this.groupsController.updateGroup
    );
    this.router.get(this.path, this.groupsController.getAll);

    this.router.delete(this.path + '/:id', this.groupsController.deleteGroup);

    //Members
    this.router.post(
      this.path + '/members/:id',
      authMiddleware,
      this.groupsController.joinGroup
    );

    this.router.put(
      this.path + '/members/:user_id/:group_id',
      this.groupsController.approveJoinRequest
    );

    this.router.delete(
      this.path + '/members/:user_id/:group_id',
      authMiddleware,
      this.groupsController.removeMember
    );

    this.router.get(
      this.path + '/members/:id',
      this.groupsController.getAllMembers
    );

    //Managers
    this.router.post(
      this.path + '/managers/:id',
      authMiddleware,
      validationMiddleware(SetManagerDto, true),
      this.groupsController.addManager
    );

    this.router.delete(
      this.path + '/managers/:group_id/:user_id',
      authMiddleware,
      this.groupsController.removeManager
    );
  }
}

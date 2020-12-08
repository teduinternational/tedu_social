import { NextFunction, Request, Response } from 'express';

import CreateGroupDto from './dtos/create_group.dto';
import GroupService from './groups.service';
import SetManagerDto from './dtos/set_manager.dto';

export default class GroupsController {
  private groupService = new GroupService();

  public createGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateGroupDto = req.body;
      const result = await this.groupService.createGroup(req.user.id, model);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getAllGroup();
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };

  public updateGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateGroupDto = req.body;
      const groupId = req.params.id;
      const result = await this.groupService.updateGroup(groupId, model);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const groups = await this.groupService.deleteGroup(groupId);
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };

  public joinGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const userId = req.user.id;
      const group = await this.groupService.joinGroup(userId, groupId);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  public approveJoinRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.group_id;
      const userId = req.params.user_id;
      const group = await this.groupService.approveJoinRequest(userId, groupId);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  public addManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const model: SetManagerDto = req.body;
      const group = await this.groupService.addManager(groupId, model);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  public removeManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.group_id;
      const userId = req.params.user_id;
      const group = await this.groupService.removeManager(groupId, userId);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  public getAllMembers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const members = await this.groupService.getAllMembers(groupId);
      res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  };

  public removeMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.group_id;
      const userId = req.params.user_id;
      const group = await this.groupService.removeMember(groupId, userId);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };
}

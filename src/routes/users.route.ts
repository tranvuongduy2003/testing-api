import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminCheckMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // user
    this.router.get(`${this.path}/profile`, AuthMiddleware, this.user.getProfile);
    this.router.put(`${this.path}/profile`, AuthMiddleware, ValidationMiddleware(UpdateUserDto, true), this.user.updateProfile);
    this.router.patch(`${this.path}/change-password`, AuthMiddleware, ValidationMiddleware(UpdatePasswordDto, true), this.user.updatePassword);
    // admin
    this.router.get(`${this.path}`, AuthMiddleware, AdminCheckMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, this.user.getUserById);
    this.router.post(`${this.path}`, AuthMiddleware, AdminCheckMiddleware, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, ValidationMiddleware(UpdateUserDto, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, this.user.deleteUser);
    this.router.patch(
      `${this.path}/change-status/:id/:isActive`,
      AuthMiddleware,
      AdminCheckMiddleware,
      ValidationMiddleware(UpdatePasswordDto, true),
      this.user.updateUserStatus,
    );
  }
}

import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AdminCheckMiddleware, AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { LoginDto, RefreshTokenDto } from '@/dtos/auth.dto';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();
  public path = '/auth';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, ValidationMiddleware(CreateUserDto), this.auth.signUp);
    this.router.post(`${this.path}/login`, ValidationMiddleware(LoginDto), this.auth.logIn);
    this.router.post(`${this.path}/refresh`, ValidationMiddleware(RefreshTokenDto), this.auth.refreshToken);
  }
}

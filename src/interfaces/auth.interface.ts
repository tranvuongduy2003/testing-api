import { Request } from 'express';
import { UserModel } from '@/models/users.model';

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  DELIVERER = 'DELIVERER',
}
export enum TokenType {
  REFRESH = 'REFRESH',
  ACCESS = 'ACCESS',
}
export interface DataStoredInToken {
  id: number;
  role: Role;
  type: TokenType;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUser extends Request {
  user: UserModel;
}

// import {User} from "./user.entity";
// import {Position} from "../position/positions.entity";
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RenderUser {
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export enum UserRole {
  ADMIN = 'ADMIN',
  ROOT = 'ROOT',
  CLIENT = 'CLIENT',
}

export const user_role: User['role'][] = [
  UserRole.ROOT,
  UserRole.ADMIN,
  UserRole.CLIENT,
];

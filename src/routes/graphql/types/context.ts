import DataLoader from 'dataloader';
import { PrismaClient, MemberType, Post, Profile } from '@prisma/client';
import { ExtendedPrismaUser } from '../modules/users/types/extended-prisma-user.type.js';

export type Context = {
  prisma: PrismaClient;
  postLoader: DataLoader<string, Post | null>;
  postsByAuthorLoader: DataLoader<string, Post[]>;
  memberTypeLoader: DataLoader<string, MemberType | null>;
  profileByIdLoader: DataLoader<string, Profile | null>;
  profileByUserIdLoader: DataLoader<string, Profile | null>;
  userLoader: DataLoader<string, ExtendedPrismaUser | null>;
};
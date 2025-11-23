import DataLoader from "dataloader";
import { PrismaClient, MemberType, Post, Profile, User } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
  postLoader: DataLoader<string, Post | null>;
  postsByAuthorLoader: DataLoader<string, Post[]>;
  memberTypeLoader: DataLoader<string, MemberType | null>;
}
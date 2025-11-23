import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { ExtendedPrismaUser } from './types/extended-prisma-user.type.js';

export const userLoader = (prisma: PrismaClient) =>
  new DataLoader<string, ExtendedPrismaUser | null>(async (userIds) => {
    const users: ExtendedPrismaUser[] = await prisma.user.findMany({
      where: { id: { in: userIds as string[] } },
      include: {
        posts: true,
        profile: true,
        subscribedToUser: true,
        userSubscribedTo: true,
      },
    });

    const map = new Map<string, ExtendedPrismaUser>(users.map((user) => [user.id, user]));

    return userIds.map((id) => map.get(id) ?? null);
  });
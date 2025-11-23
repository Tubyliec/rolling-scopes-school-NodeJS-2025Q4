import { User } from '@prisma/client';

export interface ExtendedPrismaUser extends User {
  subscribedToUser: { subscriberId: string }[];
  userSubscribedTo: { authorId: string }[];
}
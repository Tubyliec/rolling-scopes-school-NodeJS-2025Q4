import { GraphQLList } from 'graphql';
import { UserType } from './types/user.type.js';
import { Context } from '../../types/context.js';
import { ExtendedPrismaUser } from './types/extended-prisma-user.type.js';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLNonNull } from 'graphql';

export const userQueryType = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_parent: unknown, _args: unknown, context: Context) => {
      const users: ExtendedPrismaUser[] = await context.prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
          subscribedToUser: true,
          userSubscribedTo: true,
        },
      });
      users.forEach((user) => {
        context.userLoader.prime(user.id, user);
      });

      return users;
    },
  },

  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_parent: unknown, args: { id: string }, context: Context) => {
      return context.userLoader.load(args.id);
    },
  },
};
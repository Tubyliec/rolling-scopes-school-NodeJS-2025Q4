import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import { UserType } from './types/user.type.js';
import { Context } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLNonNull } from 'graphql';
import { parse, simplify, ResolveTree } from 'graphql-parse-resolve-info';

export const userQueryType = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (
      _parent: unknown,
      _args: unknown,
      context: Context,
      info: GraphQLResolveInfo,
    ) => {
      const parsedInfo = parse(info) as ResolveTree;
      const { fields } = simplify(parsedInfo, new GraphQLList(UserType));

      const users = await context.prisma.user.findMany({
        include: {
          posts: 'posts' in fields,
          profile: 'profile' in fields,
          subscribedToUser: 'subscribedToUser' in fields,
          userSubscribedTo: 'userSubscribedTo' in fields,
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
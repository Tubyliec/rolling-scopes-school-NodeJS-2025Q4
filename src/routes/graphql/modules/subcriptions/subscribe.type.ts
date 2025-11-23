import { Context } from '../../types/context.js';
import { Subscription } from './types/subcription.type.js';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLString } from 'graphql';

export const subscribeMutationType = {
  subscribeTo: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_parent: unknown, args: Subscription, context: Context) => {
      try {
        await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
      } catch (error) {
        throw new Error('User could not subscribe');
      }
    },
  },
  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_parent: unknown, args: Subscription, context: Context) => {
      try {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });

        return 'Successfully unsubscribed';
      } catch (error) {
        throw new Error('User could not unsubscribe');
      }
    },
  },
};
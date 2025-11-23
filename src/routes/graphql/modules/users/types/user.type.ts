import { Context } from '../../../types/context.js';
import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { PostType } from '../../posts/types/post.type.js';
import { ProfileType } from '../../profiles/types/profile.type.js';
import { GraphQLString } from 'graphql';
import { ExtendedPrismaUser } from './extended-prisma-user.type.js';

export const UserType: GraphQLObjectType<ExtendedPrismaUser, Context> =
  new GraphQLObjectType<ExtendedPrismaUser, Context>({
    name: 'User',
    description: 'This represents a User',

    fields: () => ({
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },

      posts: {
        type: new GraphQLList(PostType),
        resolve: (parent, _args, context) => context.postsByAuthorLoader.load(parent.id),
      },

      profile: {
        type: ProfileType,
        resolve: (parent, _args, context) =>
          context.profileByUserIdLoader.load(parent.id),
      },

      subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async (parent, _args, context) => {
          return Promise.all(
            parent.subscribedToUser.map((sub) =>
              context.userLoader.load(sub.subscriberId),
            ),
          );
        },
      },

      userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async (parent, _args, context) => {
          return Promise.all(
            parent.userSubscribedTo.map((sub) => context.userLoader.load(sub.authorId)),
          );
        },
      },
    }),
  });
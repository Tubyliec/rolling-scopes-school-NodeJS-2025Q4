import { GraphQLList } from 'graphql/type/index.js';
import { PostType } from './types/post.type.js';
import type { Context } from '../../types/context.js';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Post } from '@prisma/client';

export const postQueryType = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_parent: unknown, _args: unknown, context: Context): Promise<Post[]> => {
      const posts = await context.prisma.post.findMany();
      posts.forEach((post) => {
        context.postLoader.prime(post.id, post);
      });
      return posts;
    },
  },
  post: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_parent: unknown, args: { id: string }, context: Context) => {
      return context.postLoader.load(args.id);
    },
  },
};
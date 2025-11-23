import { GraphQLNonNull, GraphQLString } from 'graphql';
import { CreatePostType } from './types/create-post.type.js';
import { Context } from '../../types/context.js';
import { PostType } from './types/post.type.js';
import { CreatePostInputType } from './types/create-post-input.type.js';
import { UUIDType } from '../../types/uuid.js';
import { ChangePostInputType } from './types/change-post-input.type.js';
import { ChangePostType } from './types/change-post.type.js';
import { DeletePostType } from './types/delete-post.type.js';


export const postMutationType = {
  createPost: {
    type: new GraphQLNonNull(PostType),
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInputType) }
    },
    resolve: async (parent: unknown, args: CreatePostType, context: Context)=> {
      try {
        return  await context.prisma.post.create({ data: args.dto})
      } catch (err) {
        throw new Error('Post was not created')
      }

    }
  },
  changePost: {
    type: new GraphQLNonNull(PostType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType)}
    },
    resolve: async (args: ChangePostType, context: Context)=> {
      try {
        return await context.prisma.post.update({ where: { id: args.id }, data: args.dto });
      } catch (err) {
        throw new Error('Post was not updated')
      }

    }
  },
  deletePost: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (args: DeletePostType, context: Context) => {
      try {
        await context.prisma.post.delete({ where: { id: args.id } })
      } catch (err) {
        throw new Error('Post was not deleted')
      }

    }
  },
}
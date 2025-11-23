import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  description: 'Creates a new posts',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});
import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  description: 'Change a existing posts',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
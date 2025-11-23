import { postMutationType } from '../post/post-mutations.js';
import { GraphQLObjectType } from 'graphql';

export const rootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This represent a Mutation Root Type',
  fields:() => ({
    ...postMutationType,
  })
});
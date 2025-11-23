import { GraphQLObjectType } from 'graphql';
import { postQueryType } from '../post/post-query.js';
import { memberQueryType } from '../member/member-queary.type.js';

export const rootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'This represent a Query Root Type',
  fields: {
    ...memberQueryType,
    ...postQueryType,
  }
});
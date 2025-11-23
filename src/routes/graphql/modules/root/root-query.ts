import { GraphQLObjectType } from 'graphql';
import { postQueryType } from '../posts/post-query.js';
import { memberQueryType } from '../members/member-queary.type.js';
import { profileQueryType } from '../profiles/profile-query.js';
import { userQueryType } from '../users/user-query.js';

export const rootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'This represent a Query Root Type',
  fields: {
    ...memberQueryType,
    ...postQueryType,
    ...profileQueryType,
    ...userQueryType,
  },
});
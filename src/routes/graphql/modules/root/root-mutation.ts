import { postMutationType } from '../posts/post-mutations.js';
import { GraphQLObjectType } from 'graphql';
import { profileMutationType } from '../profiles/profile-mutation.js';
import { userMutationType } from '../users/user-mutation.js';
import { subscribeMutationType } from '../subcriptions/subscribe.type.js';

export const rootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This represent a Mutation Root Type',
  fields: () => ({
    ...postMutationType,
    ...profileMutationType,
    ...userMutationType,
    ...subscribeMutationType,
  }),
});
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { Context } from '../../../types/context.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../../../types/uuid.js';
import { MemberType } from '../../members/types/member-type.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'This represent a Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberType,
      resolve: async (object: Profile, args: unknown, context: Context) => {
        return context.memberTypeLoader.load(object.memberTypeId);
      },
    },
  }),
});
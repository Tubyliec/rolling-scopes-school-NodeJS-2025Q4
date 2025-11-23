import { GraphQLBoolean } from 'graphql/type/index.js';
import { GraphQLInt } from 'graphql';
import { GraphQLInputObjectType } from 'graphql';
import { MemberTypeIdEnum } from '../../members/types/member-type-id-enum.type.js';

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  description: 'Change a existing profiles',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});
import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLBoolean } from 'graphql/type/index.js';
import { GraphQLInt } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { MemberTypeIdEnum } from '../../members/types/member-type-id-enum.type.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  description: 'Creates a new profiles',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
  },
});
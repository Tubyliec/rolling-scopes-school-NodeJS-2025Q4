import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberTypeIdEnum } from './member-type-id-enum.type.js';

export const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'This represent a Member',
  fields: () => ({
      id: {type: new GraphQLNonNull(MemberTypeIdEnum)},
      discount: {type: new GraphQLNonNull(GraphQLFloat)},
      postsLimitPerMonth: {type: new GraphQLNonNull(GraphQLInt)},
    }
  )
})
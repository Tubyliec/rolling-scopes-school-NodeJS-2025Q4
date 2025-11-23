import { GraphQLEnumType } from 'graphql/type/index.js';
import { MemberTypeId } from '../../../../member-types/schemas.js';


export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  description: 'Type of membership',
  values: {
    BASIC: { value: MemberTypeId.BASIC },
    BUSINESS: { value: MemberTypeId.BUSINESS },
  }
});
import { GraphQLList } from 'graphql/type/index.js';
import { Context } from '../../types/context.js';
import { MemberType } from './types/member-type.js';
import { GraphQLNonNull } from 'graphql';
import { MemberTypeIdEnum } from './types/member-type-id-enum.type.js';

export const memberQueryType = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (context: Context) => {
      const memberTypes = await context.prisma.memberType.findMany();
      memberTypes.forEach((memberType) =>
        context.memberTypeLoader.prime(memberType.id, memberType),
      );

      return memberTypes;
    }
  },
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    },
    resolve: async (args: { id: string }, context: Context) => {
      return context.memberTypeLoader.load(args.id);
    }
  }
}
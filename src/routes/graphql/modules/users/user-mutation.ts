import { Context } from '../../types/context.js';
import { CreateUserType } from './types/create-user.type.js';
import { DeleteUserType } from './types/delete-user.type.js';
import { GraphQLNonNull } from 'graphql';
import { UserType } from './types/user.type.js';
import { ChangeUserType } from './types/change-user.type.js';
import { UUIDType } from '../../types/uuid.js';
import { ChangeUserInputType } from './types/change-user-input.type.js';
import { GraphQLString } from 'graphql';
import { CreateUserInputType } from './types/create-user-input.type.js';

export const userMutationType = {
  createUser: {
    type: new GraphQLNonNull(UserType),
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInputType) },
    },
    resolve: async (_parent: unknown, args: CreateUserType, context: Context) => {
      try {
        return await context.prisma.user.create({ data: args.dto });
      } catch (error) {
        throw new Error('User was not created');
      }
    },
  },
  changeUser: {
    type: new GraphQLNonNull(UserType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    resolve: async (_parent: unknown, args: ChangeUserType, context: Context) => {
      try {
        return await context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      } catch (error) {
        throw new Error('User was not updated');
      }
    },
  },
  deleteUser: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_parent: unknown, args: DeleteUserType, context: Context) => {
      try {
        await context.prisma.user.delete({ where: { id: args.id } });
        return 'User successfully deleted';
      } catch (error) {
        throw new Error('User was not deleted');
      }
    },
  },
};
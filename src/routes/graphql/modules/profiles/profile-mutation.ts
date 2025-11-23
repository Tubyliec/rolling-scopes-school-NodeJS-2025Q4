import { GraphQLNonNull, GraphQLString } from 'graphql';
import { ProfileType } from './types/profile.type.js';
import { CreateProfileInputType } from './types/create-profile-input.type.js';
import { CreateProfileType } from './types/create-profile.type.js';
import { Context } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { ChangeProfileInputType } from './types/change-profile-input.type.js';
import { ChangeProfileType } from './types/change-profile.type.js';
import { DeleteProfileType } from './types/delete-profile.type.js';

export const profileMutationType = {
  createProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: {
      dto: { type: new GraphQLNonNull(CreateProfileInputType) },
    },
    resolve: async (_parent: unknown, args: CreateProfileType, context: Context) => {
      try {
        return await context.prisma.profile.create({ data: args.dto });
      } catch (error) {
        throw new Error('Profile was not created');
      }
    },
  },
  changeProfile: {
    type: new GraphQLNonNull(ProfileType),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    resolve: async (_parent: unknown, args: ChangeProfileType, context: Context) => {
      try {
        return await context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      } catch (error) {
        throw new Error('Profile was not updated');
      }
    },
  },
  deleteProfile: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_parent: unknown, args: DeleteProfileType, context: Context) => {
      try {
        await context.prisma.profile.delete({ where: { id: args.id } });
        return 'Profile successfully deleted';
      } catch (error) {
        throw new Error('Profile was not deleted');
      }
    },
  },
};
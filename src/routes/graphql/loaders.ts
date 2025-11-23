import { PrismaClient } from '@prisma/client';
import { postLoader, postsByAuthorLoader } from './modules/posts/post-loaders.js';
import { memberTypeLoader } from './modules/members/member-type-loader.js';
import { userLoader } from './modules/users/user-loader.js';
import { profileLoader } from './modules/profiles/profile-loader.js';

export const loaders = (prisma: PrismaClient) => {
  return {
    prisma,
    postLoader: postLoader(prisma),
    postsByAuthorLoader: postsByAuthorLoader(prisma),
    memberTypeLoader: memberTypeLoader(prisma),
    userLoader: userLoader(prisma),
    profileByIdLoader: profileLoader(prisma, 'id'),
    profileByUserIdLoader: profileLoader(prisma, 'userId'),
  };
};
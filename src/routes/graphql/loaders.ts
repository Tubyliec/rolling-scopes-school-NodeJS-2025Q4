import { PrismaClient } from '@prisma/client';
import { postLoader, postsByAuthorLoader } from './modules/post/post-loaders.js';
import { memberTypeLoader } from './modules/member/member-type-loader.js';

export const loaders = (prisma: PrismaClient) => {
  return {
    prisma,
    postLoader: postLoader(prisma),
    postsByAuthorLoader: postsByAuthorLoader(prisma),
    memberTypeLoader: memberTypeLoader(prisma),
  };
};
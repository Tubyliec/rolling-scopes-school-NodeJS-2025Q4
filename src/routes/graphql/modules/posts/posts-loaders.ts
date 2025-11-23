import { Post, PrismaClient } from '@prisma/client';
import DataLoader from "dataloader";

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (postsIds: readonly string[]) => {
    const posts = await prisma.post.findMany({ where: { id: { in: [...postsIds] } } });
    const map = Object.fromEntries(posts.map((post) => [post.id, post]));
    return postsIds.map((id) => map[id]);
  });
};

export const postsByAuthorLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, Post[]>(async (authorIds) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: authorIds as string[] } },
    });

    const groupedPosts: Record<string, Post[]> = {};

    for (const post of posts) {
      if (!groupedPosts[post.authorId]) groupedPosts[post.authorId] = [];
      groupedPosts[post.authorId].push(post);
    }

    return authorIds.map((id) => groupedPosts[id] ?? []);
  });
};
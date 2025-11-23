import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

export const profileLoader = (prisma: PrismaClient, id: string) => {
  return new DataLoader<string, Profile | null>(async (profileIds) => {
    const profiles = await prisma.profile.findMany({
      where: { [id]: { in: profileIds } },
    });
    const map: Record<string, Profile> = {};
    for (const profile of profiles) {
      const key = String(profile[id]);
      map[key] = profile;
    }
    return profileIds.map((id) => map[id] ?? null);
  });
};
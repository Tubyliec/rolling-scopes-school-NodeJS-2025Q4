import { PrismaClient, MemberType } from '@prisma/client';
import DataLoader from 'dataloader';

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, MemberType | null>(async (memberTypeIds: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({ 
      where: { id: { in: [...memberTypeIds] } } 
    });
    const memberTypeMap = new Map<string, MemberType>();
    memberTypes.forEach((memberType) => {
      memberTypeMap.set(memberType.id, memberType);
    });
    return memberTypeIds.map((id) => memberTypeMap.get(id) ?? null);
  });
};
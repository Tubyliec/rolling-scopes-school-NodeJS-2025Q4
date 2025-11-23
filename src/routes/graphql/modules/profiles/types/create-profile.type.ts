import { UUID } from 'node:crypto';
import { MemberTypeId } from '../../../../member-types/schemas.js';

export type CreateProfileType =  {
  dto: {
    isMale: boolean
    yearOfBirth: number
    userId: UUID
    memberTypeId: MemberTypeId
  }
}
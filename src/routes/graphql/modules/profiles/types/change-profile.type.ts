import { UUID } from 'node:crypto';
import { MemberTypeId } from '../../../../member-types/schemas.js';

export type ChangeProfileType = {
  id: UUID,
  dto: {
    isMale: boolean
    yearOfBirth: number
    memberTypeId: MemberTypeId
  }
}
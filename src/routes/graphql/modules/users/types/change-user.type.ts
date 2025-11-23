import { UUID } from 'node:crypto';

export type ChangeUserType = {
  id: UUID,
  dto: {
    name: string,
    balance: number
  }
}
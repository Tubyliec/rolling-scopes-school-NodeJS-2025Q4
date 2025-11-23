import { UUID } from 'node:crypto';

export type ChangePostType = {
  id: UUID,
  dto: {
    title: string
    content: string
  }
}
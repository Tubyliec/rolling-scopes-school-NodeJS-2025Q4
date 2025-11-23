import { UUID } from 'node:crypto';

export type CreatePostType =  {
  dto: {
    title: string
    content: string
    authorId: UUID
  }
}
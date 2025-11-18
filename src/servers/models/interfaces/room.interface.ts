import { RoomUser } from './room-user.interface';

export interface Room {
  roomId: string;
  roomUsers: RoomUser[];
}

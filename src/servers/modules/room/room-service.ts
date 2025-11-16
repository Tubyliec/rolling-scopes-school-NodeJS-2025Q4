import { v4 as uuid } from 'uuid';
import { Room } from '../../models/interfaces/room.interface';
import { RoomUser } from '../../models/interfaces/room-user.interface';

const rooms: Room[] = [];

export const RoomService = {
  createRoom(user: RoomUser) {
    const roomId = uuid();
    const room: Room = { roomId, users: [user] };
    rooms.push(room);
    return room;
  },

  addUserToRoom(user: RoomUser, roomId: string) {
    const room = rooms.find((room) => room.roomId === roomId);
    if (!room) return null;
    room.users.push(user);
    return room;
  },

  getAvailableRooms() {
    return rooms;
  },
};
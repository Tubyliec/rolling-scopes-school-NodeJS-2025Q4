import { Room } from '../../models/interfaces/room.interface';
import { RoomUser } from '../../models/interfaces/room-user.interface';

const rooms: Room[] = [];

export const RoomService = {
  createRoom(user: RoomUser) {
    const roomId = Date.now().toString();
    const room: Room = { roomId, roomUsers: [user] };
    rooms.push(room);
    return room;
  },

  addUserToRoom(user: RoomUser, roomId: string) {
    const room = rooms.find((room) => room.roomId === roomId);
    if (!room) {
      return { ok: false, error: 'Room not found' };
    }

    if (room.roomUsers.some((u) => u.index === user.index)) {
      return { ok: false, error: 'You already in this room' };
    }

    if (room.roomUsers.length >= 2) {
      return { ok: false, error: 'Room is full' };
    }

    room.roomUsers.push(user);
    return { ok: true, room };
  },

  getRooms() {
    return rooms;
  },

  removeRoom(roomId: string) {
    const index = rooms.findIndex((room: Room) => room.roomId === roomId);
    if (index >= 0) rooms.splice(index, 1);
  },
};

export function getAvailableRooms() {
  return rooms
    .filter((room: Room) => room.roomUsers.length === 1)
    .map((room: Room) => ({
      roomId: room.roomId,
      roomUsers: room.roomUsers.map((user: RoomUser) => ({
        name: user.name,
        index: user.index,
      })),
    }));
}

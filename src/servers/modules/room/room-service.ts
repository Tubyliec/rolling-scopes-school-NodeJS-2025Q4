import { v4 as uuid } from 'uuid';
import { Room } from '../../models/interfaces/room.interface';
import { RoomUser } from '../../models/interfaces/room-user.interface';

const rooms: Room[] = [];
let gameIdCounter = 1;

export const RoomService = {
  createRoom(user: RoomUser) {
    const roomId = uuid();
    const room: Room = { roomId, roomUsers: [user] };
    rooms.push(room);
    return room;
  },

  addUserToRoom(user: RoomUser, roomId: string) {
    const room = rooms.find((room) => room.roomId === roomId);
    if (!room) {
      return { ok: false, error: 'Room not found' };
    }
    if (room.roomUsers.some((user) => user.index === user.index)) {
      return { ok: false, error: 'You already in this room' };
    }
    if (room.roomUsers.length >= 2) {
      return { ok: false, error: 'Room is full' };
    }
    room.roomUsers.push(user);
    if (room.roomUsers.length === 2) {
      const gameId = gameIdCounter++;
      return {
        ok: true,
        room,
        shouldStartGame: true,
        gameData: {
          gameId,
          players: room.roomUsers.map((player, index) => ({
            ...player,
            idPlayer: index + 1,
            gameId,
          })),
        },
      };
    }

    return { ok: true, room };
  },

  getAvailableRooms() {
    return rooms;
  },
};
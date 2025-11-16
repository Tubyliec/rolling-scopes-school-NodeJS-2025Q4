import { RoomService } from './room-service';
import { sendToAll } from '../../../utils/send-to-all';
import { WebSocketServer } from 'ws';

export const RoomController = {
  createRoom(ws: any, wss: WebSocketServer) {
    const room = RoomService.createRoom({
      name: ws.playerName,
      index: ws.playerIndex,
    });
    sendToAll(wss, 'update_room', RoomService.getAvailableRooms());
  },

  addUserToRoom(ws: any, data: any, wss: WebSocketServer) {
    const room = RoomService.addUserToRoom(
      { name: ws.playerName, index: ws.playerIndex },
      data.indexRoom,
    );
    if (room) {
      sendToAll(wss, 'update_room', RoomService.getAvailableRooms());
    }
  },
};
import { RoomService } from './room-service';
import { sendMessage } from '../../../utils/send';
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
    const result = RoomService.addUserToRoom(
      { name: ws.playerName, index: ws.playerIndex },
      data.indexRoom,
    );

    if (result && result.ok) {
      sendToAll(wss, 'update_room', RoomService.getAvailableRooms());
      if (result.shouldStartGame && result.gameData) {
        const { gameId, players } = result.gameData;

        players.forEach((player: any) => {
          wss.clients.forEach((client: any) => {
            if (client.playerIndex === player.index) {
              sendMessage(client, 'create_game', {
                data: {
                  idGame: gameId,
                  idPlayer: player.idPlayer,
                },
              });
            }
          });
        });
      }
    }
  },
};
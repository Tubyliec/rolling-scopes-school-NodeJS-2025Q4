import { getAvailableRooms, RoomService } from './room-service';
import { sendMessage } from '../../../utils/send-message';
import { sendToAll } from '../../../utils/send-to-all';
import { WebSocketServer } from 'ws';
import { PlayerWebSocket } from '../../models/interfaces/player-ws';
import { GameService } from '../game/game-service';
import { PlayerService } from '../players/player-service';
import { RoomData } from '../../models/interfaces/room-data.interface';

export const RoomController = {
  createRoom(ws: PlayerWebSocket, wss: WebSocketServer) {
    if (!ws.playerName || !ws.playerIndex) {
      sendMessage(ws, 'create_room', {
        error: true,
        errorText: 'Not registered',
      });
      return;
    }
    const user = {
      name: ws.playerName,
      index: ws.playerIndex,
      ws,
    };
    RoomService.createRoom(user);
    sendToAll(wss, 'update_room', getAvailableRooms());
  },

  addUserToRoom(ws: PlayerWebSocket, data: RoomData, wss: WebSocketServer) {
    if (!ws.playerName || !ws.playerIndex) {
      sendMessage(ws, 'add_user_to_room', {
        error: true,
        errorText: 'Not registered',
      });
      return;
    }
    const player = { name: ws.playerName, index: ws.playerIndex, ws };
    const result = RoomService.addUserToRoom(player, data.indexRoom);
    if (!result.ok) {
      sendMessage(ws, 'add_user_to_room', {
        error: true,
        errorText: result.error,
      });
      return;
    }

    const room = result.room;
    if (!room) {
      sendMessage(ws, 'add_user_to_room', {
        error: true,
        errorText: 'Room not found',
      });
      return;
    }

    if (room.roomUsers.length === 2) {
      const game = GameService.createGame(room);
      room.roomUsers.forEach((user) => {
        const gamePlayer = game.players.find(
          (player) => player.playerIndex === user.index,
        );
        if (user.ws)
          sendMessage(user.ws, 'create_game', {
            idGame: game.id,
            idPlayer: gamePlayer?.idInGame ?? user.index,
          });
      });

      sendToAll(wss, 'update_room', getAvailableRooms());
      sendToAll(wss, 'update_winners', PlayerService.getWinners());
    } else {
      sendToAll(wss, 'update_room', getAvailableRooms());
    }
  },
};

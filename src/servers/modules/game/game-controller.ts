import { WebSocketServer } from 'ws';
import { GameService } from './game-service';
import { sendMessage } from '../../../utils/send';
import { sendToAll } from '../../../utils/send-to-all';

export const GameController = {
  addShips(ws: any, data: any, wss: WebSocketServer) {
    GameService.addShips(data.gameId, data.indexPlayer, data.ships);
    sendMessage(ws, 'start_game', {
      ships: data.ships,
      currentPlayerIndex: data.indexPlayer,
    });
  },

  attack(ws: any, data: any, wss: WebSocketServer) {
    sendToAll(wss, 'attack', {
      position: { x: data.x, y: data.y },
      currentPlayer: data.indexPlayer,
      status: 'miss',
    });
  },

  randomAttack(ws: any, data: any, wss: WebSocketServer) {
    sendToAll(wss, 'attack', {
      position: {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      },
      currentPlayer: data.indexPlayer,
      status: 'miss',
    });
  },
};
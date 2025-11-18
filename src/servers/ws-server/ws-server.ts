import { WebSocketServer } from 'ws';
import { updateRooms, wsController } from './ws-controller';
import { PlayerWebSocket } from '../models/interfaces/player-ws';

export const wsServer = async (PORT: number) => {
  const wss = new WebSocketServer({ port: PORT });

  wss.on('connection', (ws: PlayerWebSocket) => {
    ws.playerName = null;
    ws.playerIndex = null;
    process.stdout.write('New connection \n');
    ws.on('message', (msg) => wsController(ws, msg, wss));
  });

  wss.on('close', () => {
    updateRooms(wss);
  });
};

import { WebSocketServer } from 'ws';
import { wsController } from './ws-controller';

export const wsServer = async (PORT: number) => {
  const wss = new WebSocketServer({ port: PORT });

  wss.on('connection', (ws) => {
    process.stdout.write('New connection \n');
    ws.on('message', (msg) => wsController(ws, msg, wss));
  });
};
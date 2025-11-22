import { PlayerWebSocket } from '../servers/models/interfaces/player-ws';

export function sendMessage(ws: PlayerWebSocket, type: string, data: unknown) {
  const stringifyData = JSON.stringify(data);
  const message = JSON.stringify({ type, data: stringifyData, id: 0 });
  process.stdout.write(
    `Sent message: 
    Type: ${type}\nData: ${JSON.stringify(data, null, 2)}\n`,
  );
  ws.send(message);
}
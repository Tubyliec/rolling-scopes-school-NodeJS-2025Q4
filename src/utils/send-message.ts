import { PlayerWebSocket } from '../servers/models/interfaces/player-ws';

export function sendMessage(ws: PlayerWebSocket, type: string, data: unknown) {
  const stringifyData = JSON.stringify(data);
  const message = JSON.stringify({ type, data: stringifyData, id: 0 });
  ws.send(message);
}

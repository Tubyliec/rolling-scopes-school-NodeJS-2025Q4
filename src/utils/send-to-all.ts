import { WebSocketServer } from 'ws';

export function sendToAll(wss: WebSocketServer, type: string, data: unknown) {
  const stringifyData = JSON.stringify(data);
  const message = JSON.stringify({ type, data: stringifyData, id: 0 });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

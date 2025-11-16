export function send(ws: WebSocket, type: string, data: any) {
  const stringifyData = JSON.stringify(data);
  const message = JSON.stringify({ type, data: stringifyData, id: 0 });
  ws.send(message);
}
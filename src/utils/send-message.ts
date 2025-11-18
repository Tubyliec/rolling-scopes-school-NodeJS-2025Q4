export function sendMessage(ws: any, type: string, data: unknown) {
  const stringifyData = JSON.stringify(data);
  const message = JSON.stringify({ type, data: stringifyData, id: 0 });
  ws.send(message);
}

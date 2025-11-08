import { ServerResponse } from 'node:http';

export const sendJson = (
  response: ServerResponse,
  status: number,
  payload: any,
) => {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  response.end(body);
};
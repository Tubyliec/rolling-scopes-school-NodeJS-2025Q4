import { WebSocketServer } from 'ws';

export const wsServer = async (PORT: number) => {
  const wss = new WebSocketServer({ port: PORT });
};
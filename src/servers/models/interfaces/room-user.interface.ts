import { WebSocket } from 'ws';

export interface RoomUser {
  name: string;
  index: string;
  ws?: WebSocket;
  gameIndex?: string;
}

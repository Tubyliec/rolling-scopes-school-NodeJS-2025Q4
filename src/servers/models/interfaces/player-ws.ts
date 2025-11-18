import { WebSocket } from 'ws';

export interface PlayerWebSocket extends WebSocket {
  playerName?: string;
  playerIndex?: string;
}

import WebSocket from 'ws';

export interface PlayerWebSocket extends WebSocket {
  playerName?: string | null;
  playerIndex?: string | null;
}
import { Ship } from './ship.interface';
import { PlayerWebSocket } from './player-ws';

export interface GamePlayer {
  playerIndex: string;
  idInGame: string;
  ws: PlayerWebSocket;
  ships: Ship[];
  hits: { x: number; y: number }[];
  misses: { x: number; y: number }[];
}
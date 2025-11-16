import { Ship } from './ship';

export interface Game {
  idGame: string;
  players: string[];
  ships: Record<string, Ship[]>;
  hits: Record<string, Array<{x: number, y: number}>>;
  misses: Record<string, Array<{x: number, y: number}>>;
  currentTurn: string;
}
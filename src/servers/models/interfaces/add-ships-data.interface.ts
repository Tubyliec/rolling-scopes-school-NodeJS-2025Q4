import { Ship } from './ship.interface';

export interface AddShipsData {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
}

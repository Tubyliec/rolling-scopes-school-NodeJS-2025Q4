import { GamePlayer } from './game-player';

export interface Game {
  id: string;
  players: GamePlayer[];
  currentPlayer: string;
}

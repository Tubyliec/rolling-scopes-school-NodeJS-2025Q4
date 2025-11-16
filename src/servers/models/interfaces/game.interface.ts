export interface Game {
  id: string;
  players: { id: string; ws: any; ships: any[] }[];
  turn: string;
}
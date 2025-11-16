import { Game } from '../../models/interfaces/game.interface';
import { Ship } from '../../models/interfaces/ship';
import { v4 as uuid } from 'uuid';

const games: Game[] = [];

export const GameService = {
  createGame(player1: string, player2: string) {
    const idGame = uuid();
    const game: Game = {
      idGame,
      players: [player1, player2],
      ships: {},
      hits: { [player1]: [], [player2]: [] },
      misses: { [player1]: [], [player2]: [] },
      currentTurn: player1,
    };
    games.push(game);
    return game;
  },

  addShips(gameId: string, playerIndex: string, ships: Ship[]) {
    const game = games.find((game) => game.idGame === gameId);
    if (!game) return;
    game.ships[playerIndex] = ships;
  },

  getGame(gameId: string) {
    return games.find((g) => g.idGame === gameId);
  },
};
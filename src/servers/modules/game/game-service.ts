import { Game } from '../../models/interfaces/game.interface';
import { Ship } from '../../models/interfaces/ship.interface';
import { v4 as uuid } from 'uuid';
import { Room } from '../../models/interfaces/room.interface';
import { GamePlayer } from '../../models/interfaces/game-player';
import { sendMessage } from '../../../utils/send-message';
import { isShipKilled, shipCells } from './ship';
import { PlayerService } from '../players/player-service';
import { RoomUser } from '../../models/interfaces/room-user.interface';

const games: Game[] = [];

export const GameService = {
  createGame(room: Room): Game {
    const id = room.roomId;
    const players: GamePlayer[] = room.roomUsers.map((user: RoomUser) => ({
      playerIndex: user.index,
      idInGame: uuid(),
      ws: user.ws,
      ships: [],
      hits: [],
      misses: [],
    }));
    const game: Game = { id, players, currentPlayer: players[0].idInGame };
    games.push(game);
    return game;
  },

  findGameById(gameId: string): Game | undefined {
    return games.find((game) => game.id === gameId);
  },

  addShips(gameId: string, idPlayer: string, ships: Ship[]) {
    const game = this.findGameById(gameId);
    if (!game) return null;
    const player = game.players.find((player) => player.idInGame === idPlayer);
    if (!player) return null;
    player.ships = ships.map((ship: Ship) => {
      return {
        ...ship,
        hits: [],
        position: ship.position,
        direction: ship.direction,
      };
    });
    if (game.players.every((player) => player.ships.length > 0)) {
      game.players.forEach((currentPlayer) => {
        const playerShips = currentPlayer.ships.map((ship: Ship) => {
          return {
            position: ship.position,
            direction: ship.direction,
            type: ship.type,
            length: ship.length,
            hits: ship.hits || [],
          };
        });
        const currentPlayerIndex = game.players.findIndex(
          (player) => player.idInGame === game.currentPlayer,
        );

        sendMessage(currentPlayer.ws, 'start_game', {
          ships: playerShips,
          currentPlayerIndex,
        });
      });

      const currentPlayerIndex = game.players.findIndex(
        (player) => player.idInGame === game.currentPlayer,
      );
      game.players.forEach((player) => {
        sendMessage(player.ws, 'turn', {
          currentPlayer: game.currentPlayer,
          currentPlayerIndex,
        });
      });
    }
    return game;
  },

  processAttack(gameId: string, attackerId: string, x: number, y: number) {
    const game = this.findGameById(gameId);
    if (!game) return null;
    if (game.currentPlayer !== attackerId)
      return { error: true, errorText: 'Not your turn' };

    const attacker = game.players.find(
      (player) => player.idInGame === attackerId,
    )!;
    const defender = game.players.find(
      (player) => player.idInGame !== attackerId,
    )!;
    if (
      defender.hits.some((hit) => hit.x === x && hit.y === y) ||
      defender.misses.some((miss) => miss.x === x && miss.y === y)
    ) {
      return { status: 'miss', repeated: true };
    }
    for (const ship of defender.ships) {
      const cells = shipCells(ship);
      if (cells.some((cell) => cell.x === x && cell.y === y)) {
        ship.hits = ship.hits || [];
        ship.hits.push({ x, y });
        defender.hits.push({ x, y });

        if (isShipKilled(ship)) {
          const around = getCellsAroundShip(ship);
          around.forEach((cell) => {
            if (
              !defender.misses.some(
                (miss) => miss.x === cell.x && miss.y === cell.y,
              ) &&
              !defender.hits.some((hit) => hit.x === cell.x && hit.y === cell.y)
            ) {
              defender.misses.push(cell);
            }
          });
          const allDead = defender.ships.every((ship) => isShipKilled(ship));
          if (allDead) {
            PlayerService.addWin(attacker.playerIndex);
            const index = games.findIndex((game) => game.id === gameId);
            if (index >= 0) games.splice(index, 1);
            return {
              status: 'killed',
              killedShip: {
                ...ship,
                direction: ship.direction,
              },
              win: true,
              winnerId: attackerId,
              around,
            };
          }
          return {
            status: 'killed',
            killedShip: {
              ...ship,
              direction: ship.direction,
            },
            around,
          };
        }
        return {
          status: 'shot',
          position: { x, y },
          currentPlayer: attackerId,
          ship: {
            position: ship.position,
            direction: ship.direction,
            length: ship.length,
            type: ship.type,
          },
        };
      }
    }

    defender.misses.push({ x, y });
    game.currentPlayer = defender.idInGame;
    return { status: 'miss', nextPlayer: game.currentPlayer };
  },
};

function getCellsAroundShip(ship: Ship) {
  const cells = shipCells(ship);
  const xs = cells.map((cell) => cell.x);
  const ys = cells.map((cell) => cell.y);
  const minX = Math.max(0, Math.min(...xs) - 1);
  const maxX = Math.min(9, Math.max(...xs) + 1);
  const minY = Math.max(0, Math.min(...ys) - 1);
  const maxY = Math.min(9, Math.max(...ys) + 1);

  const result: { x: number; y: number }[] = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      if (!cells.some((cell) => cell.x === x && cell.y === y))
        result.push({ x, y });
    }
  }
  return result;
}

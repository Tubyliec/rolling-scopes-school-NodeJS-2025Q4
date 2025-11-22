import { WebSocketServer } from 'ws';
import { GameService } from './game-service';
import { sendMessage } from '../../../utils/send-message';
import { PlayerWebSocket } from '../../models/interfaces/player-ws';
import { GamePlayer } from '../../models/interfaces/game-player';
import { AddShipsData } from '../../models/interfaces/add-ships-data.interface';
import { RandomAttackData } from '../../models/interfaces/random-attack-data.interface';
import { AttackData } from '../../models/interfaces/attack-data.interface';
import { sendToAll } from '../../../utils/send-to-all';
import { PlayerService } from '../players/player-service';

export const GameController = {
  addShips(ws: PlayerWebSocket, data: AddShipsData) {
    const { gameId, ships, indexPlayer } = data;
    const game = GameService.addShips(gameId, indexPlayer, ships);
    if (!game) {
      sendMessage(ws, 'add_ships', {
        error: true,
        errorText: 'Game not found',
      });
    }
  },

  attack(ws: PlayerWebSocket, data: AttackData, wss: WebSocketServer) {
    const { gameId, x, y, indexPlayer } = data;
    const response = GameService.processAttack(gameId, indexPlayer, x, y);
    if (!response) return;
    const game = GameService.findGameById(gameId);
    if (response.status === 'miss') {
      if (game) {
        game.players.forEach((player) =>
          sendMessage(player.ws, 'attack', {
            position: { x, y },
            currentPlayer: indexPlayer,
            status: 'miss',
          }),
        );
        game.players.forEach((player) =>
          sendMessage(player.ws, 'turn', {
            currentPlayer: response.nextPlayer,
          }),
        );
      } else {
        sendMessage(ws, 'attack', {
          position: { x, y },
          currentPlayer: indexPlayer,
          status: 'miss',
        });
      }
    } else if (response.status === 'shot') {
      if (game) {
        game.players.forEach((player) =>
          sendMessage(player.ws, 'attack', {
            position: { x, y },
            currentPlayer: indexPlayer,
            status: 'shot',
            ...(response.ship && {
              ship: {
                position: response.ship.position,
                direction: response.ship.direction,
                length: response.ship.length,
                type: response.ship.type,
              },
            }),
          }),
        );
        game.players.forEach((player: GamePlayer) =>
          sendMessage(player.ws, 'turn', { currentPlayer: game.currentPlayer }),
        );
      }
    } else if (
      response.status === 'killed' ||
      response.status === 'game_over'
    ) {
      const attackMessage = {
        position: { x, y },
        currentPlayer: indexPlayer,
        status: 'killed',
      };

      if (game) {
        game.players.forEach((player: GamePlayer) => {
          sendMessage(player.ws, 'attack', attackMessage);
        });

        if (response.around && Array.isArray(response.around)) {
          response.around.forEach((cell) => {
            game.players.forEach((player) => {
              sendMessage(player.ws, 'attack', {
                position: cell,
                currentPlayer: indexPlayer,
                status: 'miss',
              });
            });
          });
        }
      } else {
        sendMessage(ws, 'attack', attackMessage);
      }

      if (response.status === 'game_over') {
        const winnerId = response.winnerId;
        sendMessage(ws, 'finish', { winPlayer: winnerId });
        sendToAll(wss, 'update_winners', PlayerService.getWinners());
      }
    }
  },

  randomAttack(
    ws: PlayerWebSocket,
    data: RandomAttackData,
    wss: WebSocketServer,
  ) {
    const { gameId, indexPlayer } = data;
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    this.attack(ws, { gameId, x, y, indexPlayer }, wss);
  },
};
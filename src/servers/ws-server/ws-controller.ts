import { WebSocket, type RawData } from 'ws';
import { Server as WebSocketServer } from 'ws';
import { PlayerController } from '../modules/players/player-controller';
import { bufferParse } from '../../utils/bufer-parse';
import { RoomController } from '../modules/room/room-controller';
import { GameController } from '../modules/game/game-controller';
import { sendToAll } from '../../utils/send-to-all';

export const wsController = (
  ws: WebSocket,
  msg: RawData,
  wss: WebSocketServer,
) => {
  try {
    const message = bufferParse(msg);
    const { type, data } = message;
    process.stdout.write(
      `Received message:
       Type: ${type}\nData: ${JSON.stringify(data, null, 2)}\n`,
    );

    switch (type) {
      case 'reg':
        PlayerController.reg(ws, data, wss);
        break;
      case 'create_room':
        RoomController.createRoom(ws, wss);
        break;
      case 'add_user_to_room':
        RoomController.addUserToRoom(ws, data, wss);
        break;
      case 'add_ships':
        GameController.addShips(ws, data);
        break;
      case 'attack':
        GameController.attack(ws, data, wss);
        break;
      case 'randomAttack':
        GameController.randomAttack(ws, data, wss);
        break;
      default:
        console.warn('Unknown type', type);
    }
  } catch (error) {
    process.stderr.write(
      `Error in wsController: ${error instanceof Error ? error.message : String(error)}\n`,
    );
  }
};

export function updateRooms(wss: WebSocketServer, rooms?: unknown) {
  sendToAll(wss, 'update_room', rooms);
}
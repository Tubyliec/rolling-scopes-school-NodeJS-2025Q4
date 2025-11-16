import { WebSocket, type RawData } from 'ws';
import { Server as WebSocketServer } from 'ws';
import { PlayerController } from '../modules/players/player-controller';
import { bufferParse } from '../../utils/bufer-parse';
import { RoomController } from '../modules/room/room-controller';

export const wsController = (
  ws: WebSocket,
  msg: RawData,
  wss: WebSocketServer,
) => {
  try {
    const message = bufferParse(msg);
    const { type, data } = message;

    switch (type) {
      case 'reg':
        PlayerController.reg(ws, data, wss);
        break;
      default:
        console.log('Unknown command', type);
    }
  } catch (error) {
    process.stderr.write(
      `Error in wsController: ${error instanceof Error ? error.message : String(error)}\n`,
    );
  }
};
import { WebSocket, type RawData } from 'ws';
import { Server as WebSocketServer } from 'ws';
import { PlayerController } from '../modules/players/player-controller';
import { bufferParse } from '../../utils/bufer-parse';

export const wsController = (
  ws: WebSocket,
  msg: RawData,
  wss: WebSocketServer,
) => {
  try {
    console.log(msg);

    const message = bufferParse(msg);

    const { type, data } = message;
    console.log(type);
    console.log(data);
    console.log(typeof data);

    switch (type) {
      case 'reg':
        PlayerController.reg(ws, data);
        break;
      default:
        process.stdout.write(`Unknown command: ${type}\n`);
    }
  } catch (error) {
    process.stderr.write(
      `Error in wsController: ${error instanceof Error ? error.message : String(error)}\n`,
    );
  }
};
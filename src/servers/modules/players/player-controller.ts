import { PlayerService } from './player-service';
import { WebSocketServer } from 'ws';
import { sendMessage } from '../../../utils/send-message';
import { sendToAll } from '../../../utils/send-to-all';
import { getAvailableRooms } from '../room/room-service';
import { PlayerWebSocket } from '../../models/interfaces/player-ws';
import { RegistrationData } from '../../models/interfaces/registration-data.interface';

export const PlayerController = {
  reg(ws: PlayerWebSocket, data: RegistrationData, wss: WebSocketServer) {
    const { name, password } = data;
    const response = PlayerService.register(name, password);
    if (response.success) {
      ws.playerName = name;
      ws.playerIndex = name;
    }

    sendMessage(ws, 'reg', {
      name,
      index: ws.playerIndex,
      error: !response.success,
      errorText: response.success ? '' : response.errorText,
    });
    sendToAll(wss, 'update_winners', PlayerService.getWinners());
    sendToAll(wss, 'update_room', getAvailableRooms());
  },
};

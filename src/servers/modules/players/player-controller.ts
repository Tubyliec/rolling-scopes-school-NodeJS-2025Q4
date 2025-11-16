import { PlayerService } from './player-service';

import { WebSocketServer } from 'ws';
import { send } from '../../../utils/send';
import { sendToAll } from '../../../utils/send-to-all';

export const PlayerController = {
  reg(ws: any, data: any, wss: WebSocketServer) {
    const { name, password } = data;
    const response = PlayerService.register(name, password);
    if (response.success) {
      ws.playerName = name;
      ws.playerIndex = name;
    }

    send(ws, 'reg', {
      name,
      index: ws.playerIndex,
      error: !response.success,
      errorText: response.success ? '' : response.errorText,
    });
    sendToAll(wss, 'update_winners', PlayerService.getWinners());
  },
};
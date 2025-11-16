import { PlayerService } from './player-service';

import { WebSocket } from 'ws';

export const PlayerController = {
  reg(ws: WebSocket, data: { name: string; password: string }) {
    console.log(data);
    const { name, password } = data;
    const { player, error, errorText } = PlayerService.register(name, password);
    const message = JSON.stringify({
      type: 'reg',
      data: { name, index: name, error, errorText },
      id: 0,
    });
    console.log(message);
    ws.send(message);
  },
};
import { httpServer } from './src/servers/http-server/http-server';
import { wsServer } from './src/servers/ws-server/ws-server';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

httpServer.listen(HTTP_PORT, () => {
  process.stdout.write(`Start static http server on the ${HTTP_PORT} port! \n`);
});

wsServer(WS_PORT)
  .then(() => {
    process.stdout.write(`Start WebSocket server on the ${WS_PORT} port! \n`);
  })
  .catch((error) => {
    process.stderr.write('Failed to start WebSocket server: \n', error);
    process.exit(1);
  });

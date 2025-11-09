import { fork } from 'node:child_process';
import http from 'node:http';
import os from 'node:os';
import { STATUS_CODES } from './constants/status-codes.enum';

const PORT = Number(process.env.PORT || 4000);
const workersNumber = Math.max(1, os.availableParallelism() - 1);

const workers: { port: number }[] = [];

for (let i = 0; i < workersNumber; i++) {
  const port = PORT + 1 + i;
  fork('./dist/index.js', [], {
    env: { ...process.env, PORT: port.toString() },
  });
  workers.push({ port });
}

let current = 0;

const server = http.createServer((request, response) => {
  const worker = workers[current];
  current = (current + 1) % workers.length;

  const proxyRequest = http.request(
    {
      hostname: '127.0.0.1',
      port: worker.port,
      path: request.url,
      method: request.method,
      headers: request.headers,
    },
    (proxyResponse) => {
      response.writeHead(
        proxyResponse.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
        proxyResponse.headers,
      );
      proxyResponse.pipe(response, { end: true });
    },
  );

  request.pipe(proxyRequest, { end: true });
});

server.listen(PORT, () => {
  console.log(
    `Load balancer on port ${PORT}, ${workersNumber} workers running.`,
  );
});

import { createServer } from 'node:http';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { controller } from './controller';
import { MESSAGES } from './constants/messages.enum';
import { STATUS_CODES } from './constants/status-codes.enum';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const server = createServer(async (request, response) => {
  try {
    await controller(request, response);
  } catch (err) {
    console.error(`${MESSAGES.INTERNAL_SERVER_ERROR}:`, err);
    if (!response.headersSent) {
      response.writeHead(STATUS_CODES.INTERNAL_SERVER_ERROR, {
        'Content-Type': 'application/json',
      });
    }
    response.end(JSON.stringify({ message: MESSAGES.INTERNAL_SERVER_ERROR }));
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
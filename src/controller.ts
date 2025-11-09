import { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';
import { sendNotFound } from './utils/send-not-found';
import { MESSAGES } from './constants/messages.enum';
import { getAllUsers } from './services/get-all-users';
import { getUserById } from './services/get-user-by-id';
import { parseRequestBody } from './utils/parse-request-body';
import { createUser } from './services/create-user';
import { updateUser } from './services/update-user';
import { deleteUser } from './services/delete-user';
import { STATUS_CODES } from './constants/status-codes.enum';

export const controller = async (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const parsedUrl = url.parse(request.url || '', true);
  const pathname = parsedUrl.pathname || '';
  const requestMethod = request.method || 'GET';

  if (!pathname.startsWith('/api/')) {
    sendNotFound(response, MESSAGES.RESOURCE_NOT_FOUND);
    return;
  }

  const parsedPath = pathname
    .replace(/^\/api/, '')
    .split('/')
    .filter(Boolean);
  const resource = parsedPath[0];
  const id = parsedPath[1];

  if (resource !== 'users') {
    sendNotFound(response, MESSAGES.RESOURCE_NOT_FOUND);
    return;
  }

  try {
    switch (true) {
      case requestMethod === 'GET' && parsedPath.length === 1:
        return getAllUsers(response);
      case requestMethod === 'GET' && parsedPath.length === 2:
        return getUserById(response, id);
      case requestMethod === 'POST' && parsedPath.length === 1: {
        const body = await parseRequestBody(request);
        return createUser(response, body);
      }
      case requestMethod === 'PUT' && parsedPath.length === 2: {
        const body = await parseRequestBody(request);
        return updateUser(response, id, body);
      }
      case requestMethod === 'DELETE' && parsedPath.length === 2:
        return deleteUser(response, id);
      default:
        sendNotFound(response, MESSAGES.RESOURCE_NOT_FOUND);
    }
  } catch (err) {
    console.error('Router error:', err);
    response.writeHead(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      'Content-Type': 'application/json',
    });
    response.end(
      JSON.stringify({ message: STATUS_CODES.INTERNAL_SERVER_ERROR }),
    );
  }
};
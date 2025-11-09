import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { sendBadRequest } from '../utils/send-bad-request';
import { MESSAGES } from '../constants/messages.enum';
import { userDb } from '../db/users-db';
import { sendNotFound } from '../utils/send-not-found';
import { STATUS_CODES } from '../constants/status-codes.enum';

export const deleteUser = (response: ServerResponse, id: string) => {
  if (!validate(id)) {
    sendBadRequest(response, MESSAGES.INVALID_USER_ID);
    return;
  }
  const existingUser = userDb.getUserById(id);
  if (!existingUser) {
    sendNotFound(response, MESSAGES.USER_NOT_FOUND);
    return;
  }
  userDb.deleteUser(id);
  response.writeHead(STATUS_CODES.DELETED);
  response.end();
};

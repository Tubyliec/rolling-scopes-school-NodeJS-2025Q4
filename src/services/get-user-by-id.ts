import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { sendBadRequest } from '../utils/send-bad-request';
import { sendNotFound } from '../utils/send-not-found';
import { userDb } from '../db/users-db';
import { sendJson } from '../utils/send-json';
import { MESSAGES } from '../constants/messages.enum';
import { STATUS_CODES } from '../constants/status-codes.enum';

export const getUserById = (response: ServerResponse, id: string) => {
  if (!validate(id)) {
    sendBadRequest(response, MESSAGES.INVALID_USER_ID);
    return;
  }
  const user = userDb.getUserById(id);
  if (!user) {
    sendNotFound(response, MESSAGES.USER_NOT_FOUND);
    return;
  }
  sendJson(response, STATUS_CODES.OK, user);
};

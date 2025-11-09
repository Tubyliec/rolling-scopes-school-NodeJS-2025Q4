import { User } from '../models/types/user.type';
import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { sendBadRequest } from '../utils/send-bad-request';
import { isUserValid } from '../utils/is-user-valid';
import { sendNotFound } from '../utils/send-not-found';
import { sendJson } from '../utils/send-json';
import { MESSAGES } from '../constants/messages.enum';
import { userDb } from '../db/users-db';
import { STATUS_CODES } from '../constants/status-codes.enum';

export const updateUser = async (
  response: ServerResponse,
  id: string,
  body: unknown,
) => {
  if (!validate(id)) {
    sendBadRequest(response, MESSAGES.INVALID_USER_ID);
    return;
  }
  if (!isUserValid(body)) {
    sendBadRequest(response, MESSAGES.INVALID_USER_DATA);
    return;
  }
  const existingUser = userDb.getUserById(id);
  if (!existingUser) {
    sendNotFound(response, MESSAGES.USER_NOT_FOUND);
    return;
  }
  const updatedUser: User = { id, ...body };
  userDb.updateUser(id, updatedUser);
  sendJson(response, STATUS_CODES.OK, updatedUser);
};

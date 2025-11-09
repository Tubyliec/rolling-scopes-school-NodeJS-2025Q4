import { ServerResponse } from 'node:http';
import { sendBadRequest } from '../utils/send-bad-request';
import { User } from '../models/types/user.type';
import { sendJson } from '../utils/send-json';
import { userDb } from '../db/users-db';
import { v4 } from 'uuid';
import { STATUS_CODES } from '../constants/status-codes.enum';
import { isUserValid } from '../utils/is-user-valid';
import { MESSAGES } from '../constants/messages.enum';

export const createUser = async (response: ServerResponse, body: any) => {
  if (!isUserValid(body)) {
    sendBadRequest(response, MESSAGES.INVALID_USER_DATA);
    return;
  }
  const newUser: User = { id: v4(), ...body };
  userDb.createUser(newUser);
  sendJson(response, STATUS_CODES.CREATED, newUser);
};
import { ServerResponse } from 'node:http';
import { sendJson } from '../utils/send-json';
import { userDb } from '../db/users-db';
import { STATUS_CODES } from '../constants/status-codes.enum';

export const getAllUsers = (response: ServerResponse) => {
  sendJson(response, STATUS_CODES.OK, userDb.getAllUsers());
};

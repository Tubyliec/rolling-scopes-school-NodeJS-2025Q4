import { ServerResponse } from 'node:http';
import { sendJson } from './send-json';
import { MESSAGES } from '../constants/messages.enum';
import { STATUS_CODES } from '../constants/status-codes.enum';

export const sendNotFound = (
  response: ServerResponse,
  message = MESSAGES.NOT_FOUND,
) => {
  sendJson(response, STATUS_CODES.NOT_FOUND, { message });
};

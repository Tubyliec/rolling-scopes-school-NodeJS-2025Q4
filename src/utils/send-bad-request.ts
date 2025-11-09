import { ServerResponse } from 'node:http';
import { sendJson } from './send-json';
import { MESSAGES } from '../constants/messages.enum';
import { STATUS_CODES } from '../constants/status-codes.enum';

export const sendBadRequest = (
  response: ServerResponse,
  message = MESSAGES.BAD_REQUEST,
) => {
  sendJson(response, STATUS_CODES.BAD_REQUEST, { message });
};

import { IncomingMessage } from 'node:http';
import { MESSAGES } from '../constants/messages.enum';

export const parseRequestBody = async (
  request: IncomingMessage,
): Promise<unknown> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  const message = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(message);
  } catch {
    throw new Error(MESSAGES.INVALID_JSON);
  }
};

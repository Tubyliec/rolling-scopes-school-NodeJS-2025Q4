import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { errorMessage } from './errorMessage.js';

export const calcHash = async (input) => {
  try {
    const reader = fs.createReadStream(path.resolve(input));
    const hash = crypto.createHash('sha256');

    await pipeline(reader, hash);
    console.log(hash.digest('hex'));
  } catch {
    errorMessage();
  }
};
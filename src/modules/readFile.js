import path from 'node:path';
import fs from 'node:fs';
import { finished } from 'node:stream/promises';
import { errorMessage } from './errorMessage.js';

export const readFile = async (input) => {
  try {
    const pathToFile = path.resolve(input);
    const readStream = fs.createReadStream(pathToFile);
    readStream.pipe(process.stdout);
    await finished(readStream);
    process.stdout.write('\n');
  } catch {
    errorMessage();
  }
};
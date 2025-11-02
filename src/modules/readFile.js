import path from 'node:path';
import fs from 'node:fs';
import { finished } from 'node:stream/promises';

export const readFile = async (input) => {
  try {
    const pathToFile = path.resolve(input);
    const readStream = fs.createReadStream(pathToFile);
    readStream.pipe(process.stdout);
    await finished(readStream);
    process.stdout.write('\n');
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
};
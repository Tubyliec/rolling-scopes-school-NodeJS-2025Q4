import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { errorMessage } from './errorMessage.js';

export const addFile = async (input) => {
  try {
    const filename = typeof input === 'string' ? input : input[0];
    await fsPromises.writeFile(path.resolve(filename), '', {
      flag: 'wx',
    });
    console.log(`File ${filename.split('/').at(-1)} created`);
  } catch {
    errorMessage();
  }
};
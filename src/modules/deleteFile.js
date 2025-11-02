import path from 'node:path';
import fsPromises from 'node:fs/promises';
import { errorMessage } from './errorMessage.js';

export const deleteFile = async (input) => {
  try {
    await fsPromises.rm(path.resolve(input));
    console.log(`File ${input.split('/').at(-1)} deleted`);
  } catch {
    errorMessage();
  }
};
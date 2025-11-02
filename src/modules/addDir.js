import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { errorMessage } from './errorMessage.js';

export const addDir = async (input) => {
  try {
    const pathToDir = typeof input === 'string' ? input : input[0];
    const resolvedPath = path.resolve(pathToDir);
    await fsPromises.mkdir(resolvedPath, { recursive: true });
    console.log(`Directory created: ${resolvedPath}`);
  } catch (err) {
    errorMessage();
  }
};
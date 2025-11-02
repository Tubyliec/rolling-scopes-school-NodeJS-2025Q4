import fs from 'node:fs';
import path from 'node:path';
import { errorMessage } from './errorMessage.js';

export const copyFile = async (input) => {
  try {
    const [pathToFile, pathToNewDir] = input;

    const reader = fs
      .createReadStream(path.resolve(pathToFile))
      .on('error', (error) =>
        console.error(`Cannot copy file: ${error.message}`),
      );
    const writer = fs
      .createWriteStream(path.resolve(pathToNewDir, pathToFile), {
        flags: 'w',
      })
      .on('error', (error) =>
        console.error(`Cannot copy file: ${error.message}`),
      );

    reader.pipe(writer);
    console.log(`File copied successfully`);
  } catch {
    errorMessage();
  }
};
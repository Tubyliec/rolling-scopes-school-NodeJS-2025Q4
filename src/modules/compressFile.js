import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { errorMessage } from './errorMessage.js';

export const compressFile = async (input) => {
  try {
    const [pathToFile, pathToZipFile] = input;

    const resolvedDestination = path.join(
      path.resolve(pathToZipFile),
      path.basename(pathToFile) + '.br',
    );

    const reader = fs.createReadStream(path.resolve(pathToFile));
    const writer = fs.createWriteStream(path.resolve(resolvedDestination));
    const zlibBrotliCompress = zlib.createBrotliCompress();

    reader.pipe(zlibBrotliCompress).pipe(writer);
    console.log(`File compressed successfully`);
  } catch {
    errorMessage();
  }
};
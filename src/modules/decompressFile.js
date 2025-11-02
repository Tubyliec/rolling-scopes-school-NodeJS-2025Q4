import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { finished } from 'node:stream/promises';
import { errorMessage } from './errorMessage.js';

export const decompressFile = async (input) => {
  try {
    const [sourceArchive, destination] = input;
    const resolvedSource = path.resolve(sourceArchive);
    const baseName = path.basename(sourceArchive, '.br');
    let resolvedDestination = path.join(path.resolve(destination), baseName);

    const reader = fs.createReadStream(resolvedSource);
    const writer = fs.createWriteStream(resolvedDestination);
    const decompressStream = zlib.createBrotliDecompress();

    reader.pipe(decompressStream).pipe(writer);
    await finished(writer);

    console.log(
      `File successfully decompressed ${resolvedSource} → ${resolvedDestination}`,
    );
  } catch {
    errorMessage();
  }
};
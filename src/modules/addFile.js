import fsPromises from 'node:fs/promises';
import path from 'node:path';

export const addFile = async (input) => {
  try {
    const filename = typeof input === 'string' ? input : input[0];
    await fsPromises.writeFile(path.resolve(filename), '', {
      flag: 'wx',
    });
    console.log(`File ${filename.split('/').at(-1)} created`);
  } catch (err) {
    throw new Error(`Cannot create file: ${err.message}`);
  }
};
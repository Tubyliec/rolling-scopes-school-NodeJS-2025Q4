import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { errorMessage } from './errorMessage.js';

export const renameFile = async (input) => {
  try {
    if (!Array.isArray(input) || input.length !== 2) {
      console.error('Input must be [oldName, newName]');
    }

    const [oldName, newName] = input;
    const resolvedOldPath = path.resolve(oldName);
    const resolvedNewPath = path.resolve(
      path.dirname(resolvedOldPath),
      newName,
    );

    await fsPromises.rename(resolvedOldPath, resolvedNewPath);
    console.log(
      `File successfully renamed ${resolvedOldPath} → ${resolvedNewPath}`,
    );
  } catch {
    errorMessage();
  }
};
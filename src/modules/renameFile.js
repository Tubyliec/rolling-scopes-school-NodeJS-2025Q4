import fsPromises from 'node:fs/promises';
import path from 'node:path';

export const renameFile = async (input) => {
  try {
    if (!Array.isArray(input) || input.length !== 2) {
      throw new Error('Input must be [oldPath, newName]');
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
  } catch (err) {
    throw new Error(`Cannot rename file: ${err.message}`);
  }
};
import { copyFile } from './copyFile.js';
import { deleteFile } from './deleteFile.js';
import { errorMessage } from './errorMessage.js';

export const moveFile = async (input) => {
  try {
    const [pathToFile, pathToNewDir] = input;
    await copyFile(input);
    await deleteFile(pathToFile);
    console.log(`File moved: ${pathToFile} → ${pathToNewDir}`);
  } catch {
    errorMessage();
  }
};
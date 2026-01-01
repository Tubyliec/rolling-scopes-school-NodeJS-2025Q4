import path from 'path';
import { errorMessage } from './errorMessage.js';

export const changeDir = async (input) => {
  if (!input || input.length === 0) {
    errorMessage();
  }
  const targetPath = path.resolve(input);
  try {
    process.chdir(targetPath);
  } catch {
    errorMessage();
  }
};
import path from 'node:path';
import process from 'node:process';

export const parseInput = (inputPath) => {
  if (!inputPath || typeof inputPath !== 'string') {
    throw new Error('Invalid input');
  }
  const cleanedPath = inputPath.trim().replace(/^["']|["']$/g, '');
  const resolvedPath = path.resolve(process.cwd(), cleanedPath);
  console.log(resolvedPath);
  return resolvedPath;
};
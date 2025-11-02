import path from 'node:path';
import process from 'node:process';


export const parseInput = (inputPath) => {
    if (!inputPath || typeof inputPath !== 'string') {
        throw new Error('Invalid input');
    }

    // Trim whitespace and remove quotes if the user typed "path with spaces"
    const cleanedPath = inputPath.trim().replace(/^["']|["']$/g, '');

    // Resolve the path relative to the current working directory
    const absolutePath = path.resolve(process.cwd(), cleanedPath);

    return absolutePath;
};
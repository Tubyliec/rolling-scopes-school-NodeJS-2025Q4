import readline from 'readline';

import { parseUserName } from './modules/parseUserName.js';
import { findHomeDir } from './modules/findHomeDir.js';
import { defineCurrentWorkingDir } from './modules/defineCurrentDir.js';
import { parseInput } from './modules/parseInput.js';
import { changeDir } from './modules/changeDir.js';
import { createListOfFiles } from './modules/createListOfFiles.js';
import { readFile } from './modules/readFile.js';
import { addDir } from './modules/addDir.js';
import { invalidInputMessage } from './modules/invalidInputMessage.js';
import { addFile } from './modules/addFile.js';
import { renameFile } from './modules/renameFile.js';
import { copyFile } from './modules/copyFile.js';
import { deleteFile } from './modules/deleteFile.js';
import { moveFile } from './modules/moveFile.js';

const args = process.argv.slice(2);
const userName = parseUserName(args);

console.log(`Welcome to the File Manager, ${userName}!`);

let homeDir = findHomeDir();
process.chdir(homeDir);
let currentDir = defineCurrentWorkingDir();

const commandLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

commandLine.on('line', async (input) => {
  const trimmedInput = input.trim();
  const [command, ...args] = trimmedInput.split(' ');

  switch (command) {
    case 'exit':
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit(0);
      break;

    case 'up':
      changeDir('..');
      defineCurrentWorkingDir();
      break;

    case 'cd':
      if (args.length === 0) {
        console.log('Invalid input');
        break;
      }
      await changeDir(parseInput(args.join(' ')));
      defineCurrentWorkingDir();
      break;

    case 'ls':
      await createListOfFiles(defineCurrentWorkingDir());
      defineCurrentWorkingDir();
      break;

    case 'cat':
      await readFile(parseInput(args.join(' ')));
      defineCurrentWorkingDir();
      break;

    case 'mkdir':
      await addDir(parseInput(args.join(' ')));
      defineCurrentWorkingDir();
      break;

    case 'add':
      await addFile(parseInput(args.join(' ')));
      defineCurrentWorkingDir();
      break;

    case 'rn':
      await renameFile(args);
      defineCurrentWorkingDir();
      break;

    case 'cp':
      await copyFile(args);
      defineCurrentWorkingDir();
      break;

    case 'rm':
      await deleteFile(parseInput(args.join(' ')));
      defineCurrentWorkingDir();
      break;

    case 'mv':
      await moveFile(args);
      defineCurrentWorkingDir();
      break;

    default:
      invalidInputMessage();
      defineCurrentWorkingDir();
  }
});

commandLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
import readline from 'readline';

import { parseUserName } from './modules/parseUserName.js';
import { findHomeDir } from './modules/findHomeDir.js';
import { defineCurrentWorkingDir } from './modules/defineCurrentDir.js';
import { parseInput } from './modules/parseInput.js';
import { changeDir } from './modules/changeDir.js';
import { createListOfFiles } from './modules/createListOfFiles.js';
import { readFile } from './modules/readFile.js';
import { addDir } from './modules/addDir.js';

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
      const list = await createListOfFiles(defineCurrentWorkingDir());
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
  }
});

commandLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
import readline from 'readline';

import { parseUserName } from './modules/parseUserName.js';


const args = process.argv.slice(2);
const userName = parseUserName(args);

console.log(`Welcome to the File Manager, ${userName}!`);

const commandLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


commandLine.on('line', async (input) => {
    const trimmedInput = input.trim();

    switch (trimmedInput) {
        case 'exit':
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
            process.exit(0);
    }
});


commandLine.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
});
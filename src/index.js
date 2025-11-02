import { parseUserName } from './modules/parseUserName.js';


const args = process.argv.slice(2);
const userName = parseUserName(args);

console.log(`Welcome to the File Manager, ${userName}!`);
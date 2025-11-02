import os from 'node:os';

export const findHomeDir = () => {
    return os.homedir();
}
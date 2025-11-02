export const defineCurrentWorkingDir = () => {
    const currentDir = process.cwd();
    console.log (`You are currently in ${currentDir}`);
    return currentDir
}
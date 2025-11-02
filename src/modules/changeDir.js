import fs from "fs/promises";
import path from "path";

export const changeDir = async (input) => {
    if (!input || input.length === 0) {
        throw new Error("No path provided");
    }
    const targetPath = path.resolve(input);
    process.chdir(targetPath);
};
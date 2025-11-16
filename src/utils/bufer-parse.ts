import { RawData } from 'ws';

export const bufferParse = (msg: RawData) => {
  try {
    const str = msg.toString();
    let object = JSON.parse(str);
    for (const key in object) {
      if (typeof object[key] === 'string') {
        try {
          const parsed = JSON.parse(object[key]);
          object[key] = parsed;
        } catch {}
      }
    }

    return object;
  } catch (error) {
    process.stderr.write(
      `Bad JSON: ${error instanceof Error ? error.message : String(error)}\n`,
    );
  }
};
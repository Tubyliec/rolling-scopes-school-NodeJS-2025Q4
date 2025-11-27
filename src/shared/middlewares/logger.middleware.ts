import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as process from 'node:process';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    process.stdout.write(
      `Request method: ${req.method}, Request url: ${req.url}, Request body: ${JSON.stringify(req.body)}\n`
    );
    process.stdout.write(`Response status code: ${res.statusCode}`);
    next();
  }
}
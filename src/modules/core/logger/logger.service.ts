import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { CustomLogLevel } from './models/types/custom-log-level.type';
import { formatMeta } from '../../shared/formatters/meta-formatter';

@Injectable()
export class LoggingService {
  private readonly logLevel: CustomLogLevel;
  private readonly maxFileSize: number;
  private readonly logFilePath: string;

  constructor(private readonly configService: ConfigService) {
    this.logLevel =
      this.configService.get<CustomLogLevel>('LOG_LEVEL') || 'info';
    this.maxFileSize = this.configService.get<number>('LOG_FILE_SIZE') * 1024;
    this.logFilePath = path.join(process.cwd(), 'app.log');
  }

  private shouldLog(level: CustomLogLevel): boolean {
    const order: CustomLogLevel[] = ['error', 'warn', 'info', 'debug'];
    return order.indexOf(level) <= order.indexOf(this.logLevel);
  }

  private async rotate(): Promise<void> {
    try {
      const stats = await fs.stat(this.logFilePath).catch(() => null);
      if (stats && stats.size >= this.maxFileSize) {
        await fs.rename(this.logFilePath, `${this.logFilePath}.${Date.now()}`);
      }
    } catch (error) {
      process.stdout.write('Error during log rotation:', error);
    }
  }

  private async write(
    level: CustomLogLevel,
    message: string,
    meta?: unknown,
  ): Promise<void> {
    if (!this.shouldLog(level)) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      meta: formatMeta(meta),
    };

    const logString = JSON.stringify(logEntry, null, 2);

    try {
      await this.rotate();
      await fs.appendFile(this.logFilePath, logString + '\n');
      process.stdout.write(logString + '\n');
    } catch (error) {
      process.stdout.write('Error writing to log file:', error);
      process.stdout.write(`[LOG ERROR] ${error.message}\n${logString}\n`);
    }
  }

  public async error(message: string, meta?: unknown): Promise<void> {
    await this.write('error', message, meta);
  }

  public async warn(message: string, meta?: unknown): Promise<void> {
    await this.write('warn', message, meta);
  }

  public async info(message: string, meta?: unknown): Promise<void> {
    await this.write('info', message, meta);
  }

  public async debug(message: string, meta?: unknown): Promise<void> {
    await this.write('debug', message, meta);
  }
}

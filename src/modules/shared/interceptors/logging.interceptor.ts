import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggingService } from '../../core/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, url, query, body } = request;

    this.loggingService
      .info('Incoming Request', {
        method,
        url: originalUrl || url,
        query,
        body,
        timestamp: new Date().toISOString(),
      })
      .catch((err) => process.stdout.write('Logging failed:', err));

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        this.loggingService.info('Response', {
          statusCode: response.statusCode,
          responseTime: `${Date.now() - now}ms`,
          timestamp: new Date().toISOString(),
        });
      }),
      catchError((error) => {
        this.loggingService.error('Request failed', {
          error: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        });
        return throwError(() => error);
      }),
    );
  }
}

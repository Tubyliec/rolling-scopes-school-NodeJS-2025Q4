import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from '../../core/logger/logger.service';

export interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let error = 'Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
        error = 'Bad Request';
      } else {
        const errorObject = errorResponse as HttpExceptionResponse;
        message = errorObject.message || message;
        error = errorObject.error || error;
      }
    }

    try {
      await this.loggingService.error(`HTTP Error ${status}`, {
        statusCode: status,
        message,
        error,
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
        stack: exception instanceof Error ? exception.stack : undefined,
      });
    } catch (err) {
      process.stdout.write('Failed to log error:', err);
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
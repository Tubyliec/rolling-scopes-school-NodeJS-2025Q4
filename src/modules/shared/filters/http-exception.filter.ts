import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    let message: string | string[];
    let error: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
      error = 'Bad Request';
    } else {
      const errorObj = errorResponse as HttpExceptionResponse;
      message = errorObj.message || 'Internal server error';
      error = errorObj.error || 'Error';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      route: request.url,
      message,
      error,
    });
  }
}
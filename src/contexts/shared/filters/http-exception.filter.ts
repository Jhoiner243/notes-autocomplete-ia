/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // El nombre del parámetro en el constructor debe ser descriptivo
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Lógica para extraer un mensaje de error útil
    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      // Extrae el mensaje de las excepciones HTTP de NestJS
      const response = exception.getResponse();
      message =
        typeof response === 'string' ? response : (response as any).message;
    } else if (exception instanceof Error) {
      // Extrae el mensaje de los errores estándar de JavaScript
      message = exception.message;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      message: message,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}

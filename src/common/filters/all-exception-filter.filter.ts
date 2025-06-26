import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilterFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg: unknown =
      (exception as HttpException)['response'] || 'Internal Server Error';

    const responseBody = {
      statusCode: httpStatus,
      headers: request.headers,
      query: request.query,
      body: request.body as unknown,
      params: request.params,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()) as string,
      ip: requestIp.getClientIp(request),
      exception: (exception as Error).name,
      msg,
    };

    this.logger.error((exception as Error).name, responseBody);

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}

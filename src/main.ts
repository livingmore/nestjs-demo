import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { consoleTransport, createTransportsFile } from './common/logger/utils';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { AllExceptionFilterFilter } from './common/filters/all-exception-filter.filter';

async function bootstrap() {
  const loggerInstance = winston.createLogger({
    transports: [
      consoleTransport,
      createTransportsFile('info', 'info'),
      createTransportsFile('warn', 'error'),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });
  const configService = app.get(ConfigService);

  app.useGlobalFilters(
    new AllExceptionFilterFilter(app.get(Logger), app.get(HttpAdapterHost)),
  );
  app.setGlobalPrefix('api');

  const versions = configService.get<string>('VERSION')?.split(',');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: versions,
  });

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
  loggerInstance.info('app already run on port: ' + port);
}

bootstrap();

import * as process from 'node:process';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { generateSwaggerYaml } from '../config/swagger/generate-swagger-yaml';

import { AppModule } from './app.module';
import { LoggingService } from './modules/core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: string = configService.get('PORT');
  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    loggingService.error('uncaughtException', error);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('unhandledRejection', reason);
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await generateSwaggerYaml(app);

  app.enableCors();

  await app.listen(port, '0.0.0.0', () => {
    process.stdout.write(`Server started on port ${port}\n`);
  });
}
bootstrap().catch((error: Error) => {
  process.stderr.write(error.message);
});

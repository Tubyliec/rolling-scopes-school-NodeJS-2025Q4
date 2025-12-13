import * as process from 'node:process';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './modules/shared/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './modules/shared/guards/jwt-auth.guard';

import { generateSwaggerYaml } from '../config/swagger/generate-swagger-yaml';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: string = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalFilters(new HttpExceptionFilter());

  await generateSwaggerYaml(app);

  app.enableCors();

  await app.listen(port, '0.0.0.0', () => {
    process.stdout.write(`Server started on port ${port}\n`);
  });
}
bootstrap().catch((error: Error) => {
  process.stderr.write(error.message);
});
import * as process from 'node:process';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { generateSwaggerYaml } from '../tools/generate-swagger-yaml';

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
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await generateSwaggerYaml(app);

  await app.listen(port, '0.0.0.0', () => {
    process.stdout.write(`Server started on port ${port}\n`);
  });
}
bootstrap().catch((error: Error) => {
  process.stderr.write(error.message);
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: string = configService.get('PORT');
  await app.listen(port, () => {
    process.stdout.write(`Server started on port ${port}`);
  });
}
bootstrap().catch((error: Error) => {
  process.stderr.write(error.message);
});
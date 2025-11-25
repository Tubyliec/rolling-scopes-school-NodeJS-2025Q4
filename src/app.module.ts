import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['config/.env'] })],
  controllers: [],
  providers: [],
})
export class AppModule {}
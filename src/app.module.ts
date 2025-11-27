import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['config/.env'] }), DatabaseModule, UserModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
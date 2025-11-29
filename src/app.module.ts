import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { TrackModule } from './modules/track/track.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { ArtistModule } from './modules/artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['config/.env'] }),
    DatabaseModule,
    UserModule,
    TrackModule,
    ArtistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
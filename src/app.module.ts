import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlbumModule } from './modules/feature/album/album.module';
import { ArtistModule } from './modules/feature/artist/artist.module';
import { FavoriteModule } from './modules/feature/favorite/favorite.module';
import { PrismaModule } from './modules/core/prisma/prisma.module';
import { TrackModule } from './modules/feature/track/track.module';
import { UserModule } from './modules/feature/user/user.module';
import { LoggerMiddleware } from './modules/shared/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
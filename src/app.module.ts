import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './modules/feature/album/album.module';
import { ArtistModule } from './modules/feature/artist/artist.module';
import { FavoriteModule } from './modules/feature/favorite/favorite.module';
import { PrismaModule } from './modules/core/prisma/prisma.module';
import { TrackModule } from './modules/feature/track/track.module';
import { UserModule } from './modules/feature/user/user.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { LoggingService } from './modules/core/logger/logger.service';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { LoggingInterceptor } from './modules/shared/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './modules/shared/filters/http-exception.filter';
import { JwtAuthGuard } from './modules/shared/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AuthModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    LoggingService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

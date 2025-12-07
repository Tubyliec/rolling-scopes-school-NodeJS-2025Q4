import { Module } from '@nestjs/common';

import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { DatabaseModule } from '../database/database.module';
import { TrackModule } from '../track/track.module';

import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [DatabaseModule, TrackModule, AlbumModule, ArtistModule],
})
export class FavoriteModule {}

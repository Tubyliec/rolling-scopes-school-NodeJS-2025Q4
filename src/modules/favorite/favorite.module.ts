import { Module } from '@nestjs/common';

import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';

import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [TrackModule, AlbumModule, ArtistModule],
})
export class FavoriteModule {}
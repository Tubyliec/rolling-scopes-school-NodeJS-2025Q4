import { Module } from '@nestjs/common';

import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [AlbumModule, TrackModule],
  exports: [ArtistService],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from '../database/database.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DatabaseModule, AlbumModule, TrackModule],
  exports: [ArtistService],
})
export class ArtistModule {}

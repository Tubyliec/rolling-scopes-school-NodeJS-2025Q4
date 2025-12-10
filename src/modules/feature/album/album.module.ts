import { Module } from '@nestjs/common';

import { TrackModule } from '../track/track.module';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}
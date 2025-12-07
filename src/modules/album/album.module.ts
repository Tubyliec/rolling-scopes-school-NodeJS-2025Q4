import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { TrackModule } from '../track/track.module';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DatabaseModule, TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}

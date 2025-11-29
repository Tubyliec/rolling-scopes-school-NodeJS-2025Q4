import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseModule } from '../database/database.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DatabaseModule, TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}

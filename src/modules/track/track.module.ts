import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DatabaseModule],
  exports: [TrackService],
})
export class TrackModule {}

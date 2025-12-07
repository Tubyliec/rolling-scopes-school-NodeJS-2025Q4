import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DatabaseModule],
  exports: [TrackService],
})
export class TrackModule {}

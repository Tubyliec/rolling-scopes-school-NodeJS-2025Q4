import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DatabaseModule],
})
export class ArtistModule {}
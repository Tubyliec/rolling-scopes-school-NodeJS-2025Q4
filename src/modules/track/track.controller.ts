import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UUIDValidationPipe } from '../../shared/validators/uuid-validation.pipe';

import { CreateTrackDto } from './models/dto/create-track.dto';
import { ResponseTrackDto } from './models/dto/response-track.dto';
import { UpdateTrackDto } from './models/dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<ResponseTrackDto[]> {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrack(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<ResponseTrackDto> | undefined {
    return this.trackService.getTrack(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Body() trackRequest: CreateTrackDto,
  ): Promise<ResponseTrackDto> {
    return this.trackService.createTrack(trackRequest);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', UUIDValidationPipe)
    id: string,
    @Body() updateRequest: UpdateTrackDto,
  ): Promise<ResponseTrackDto> {
    return this.trackService.updateTrack(id, updateRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<boolean> {
    return this.trackService.deleteTrack(id);
  }
}

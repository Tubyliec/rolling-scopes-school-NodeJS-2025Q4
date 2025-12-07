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

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './models/dto/create-artist.dto';
import { ResponseArtistDto } from './models/dto/response-artist.dto';
import { UpdateArtistDto } from './models/dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<ResponseArtistDto[]> {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtist(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<ResponseArtistDto> | undefined {
    return this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() trackRequest: CreateArtistDto,
  ): Promise<ResponseArtistDto> {
    return this.artistService.createArtist(trackRequest);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', UUIDValidationPipe)
    id: string,
    @Body() updateRequest: UpdateArtistDto,
  ): Promise<ResponseArtistDto> {
    return this.artistService.updateArtist(id, updateRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<boolean> {
    return this.artistService.deleteArtist(id);
  }
}

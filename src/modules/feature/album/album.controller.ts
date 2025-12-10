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

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './models/dto/create-album.dto';
import { UpdateAlbumDto } from './models/dto/update-album.dto';
import { Album } from './models/interfaces/album.interface.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbum(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<Album> | undefined {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() albumRequest: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(albumRequest);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', UUIDValidationPipe)
    id: string,
    @Body() updateRequest: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, updateRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', UUIDValidationPipe)
    id: string,
  ): Promise<boolean> {
    return this.albumService.deleteAlbum(id);
  }
}

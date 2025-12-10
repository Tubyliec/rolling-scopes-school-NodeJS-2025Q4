import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { UUIDValidationPipe } from '../../shared/validators/uuid-validation.pipe';

import { FavoriteService } from './favorite.service';
import { ResponseFavoriteDto } from './models/dto/response-favorite.dto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll(): Promise<ResponseFavoriteDto> {
    return this.favoriteService.findAllFavoriteItems();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Param('id', UUIDValidationPipe) id: string) {
    return this.favoriteService.createFavoriteItem(id, 'tracks');
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  createAlbum(@Param('id', UUIDValidationPipe) id: string) {
    return this.favoriteService.createFavoriteItem(id, 'albums');
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  createArtist(@Param('id', UUIDValidationPipe) id: string) {
    return this.favoriteService.createFavoriteItem(id, 'artists');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.favoriteService.removeFavoriteItem(id, 'tracks');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.favoriteService.removeFavoriteItem(id, 'albums');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.favoriteService.removeFavoriteItem(id, 'artists');
  }
}

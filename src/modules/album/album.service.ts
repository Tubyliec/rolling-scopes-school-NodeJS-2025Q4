import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../artist/models/interfaces/artist.interface';
import { CreateArtistDto } from '../artist/models/dto/create-artist.dto';
import { v4 } from 'uuid';
import { UpdateArtistDto } from '../artist/models/dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';
import { Album } from './models/interfaces/album.interface.dto';
import { CreateAlbumDto } from './models/dto/create-album.dto';
import { UpdateAlbumDto } from './models/dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService<Album>) {}

  public async getAllAlbums(): Promise<Album[]> {
    return this.databaseService.getAllItems();
  }

  public async getAlbum(id: string): Promise<Album> {
    const album: Album = this.databaseService.getItem(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  public async createAlbum(trackRequest: CreateAlbumDto): Promise<Album> {
    const album = {
      ...trackRequest,
      id: v4(),
    };
    return this.databaseService.createItem(album);
  }

  public async updateAlbum(
    id: string,
    updateRequest: UpdateAlbumDto,
  ): Promise<Album> {
    const album = this.databaseService.getItem(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    const updatedAlbum = {
      ...album,
      name: updateRequest.name,
      year: updateRequest.year,
      artistId: updateRequest.artistId,
    };
    return this.databaseService.updateItem(id, updatedAlbum);
  }

  public async deleteAlbum(id: string): Promise<boolean> {
    const isAlbumDeleted = this.databaseService.deleteItem(id);
    if (!isAlbumDeleted) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return isAlbumDeleted;
  }
}
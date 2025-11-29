import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v4 } from 'uuid';
import { Artist } from './models/interfaces/artist.interface';
import { CreateArtistDto } from './models/dto/create-artist.dto';
import { UpdateArtistDto } from './models/dto/update-artist.dto';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private databaseService: DatabaseService<Artist>,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  public async getAllArtists(): Promise<Artist[]> {
    return this.databaseService.getAllItems();
  }

  public async getArtist(id: string): Promise<Artist> {
    const artist = this.databaseService.getItem(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  public async createArtist(trackRequest: CreateArtistDto): Promise<Artist> {
    const artist = {
      ...trackRequest,
      id: v4(),
    };
    return this.databaseService.createItem(artist);
  }

  public async updateArtist(
    id: string,
    updateRequest: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.databaseService.getItem(id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    const updatedArtist = {
      ...artist,
      name: updateRequest.name,
      grammy: updateRequest.grammy,
    };
    return this.databaseService.updateItem(id, updatedArtist);
  }

  public async deleteArtist(id: string): Promise<boolean> {
    const isArtistDeleted = this.databaseService.deleteItem(id);

    if (!isArtistDeleted) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    const tracks = (await this.trackService.getAllTracks()).filter(
      (track) => track.artistId === id,
    );

    const albums = (await this.albumService.getAllAlbums()).filter(
      (album) => album.artistId === id,
    );

    await Promise.all([
      ...tracks.map((track) =>
        this.trackService.updateTrack(track.id, { ...track, artistId: null }),
      ),
      ...albums.map((album) =>
        this.albumService.updateAlbum(album.id, { ...album, artistId: null }),
      ),
    ]);
    return isArtistDeleted;
  }
}
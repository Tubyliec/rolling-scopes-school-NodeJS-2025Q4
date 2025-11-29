import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Favorites } from './models/interfaces/favorites.interface';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoriteType } from './models/types/favorite-type';
import { ResponseFavoriteDto } from './models/dto/response-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    private databaseService: DatabaseService<Favorites>,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  public async createFavoriteItem(id: string, type: FavoriteType) {
    try {
      switch (type) {
        case 'artists':
          await this.artistService.getArtist(id);
          break;
        case 'albums':
          await this.albumService.getAlbum(id);
          break;
        case 'tracks':
          await this.trackService.getTrack(id);
          break;
      }
      this.databaseService.createFavoriteItem(id, type);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException(
          `${type.toUpperCase()} with ID ${id} not found`,
        );
      }
      throw error;
    }
  }

  public async findAllFavoriteItems(): Promise<ResponseFavoriteDto> {
    const [tracks, albums, artists, favoriteItems] = await Promise.all([
      this.trackService.getAllTracks(),
      this.albumService.getAllAlbums(),
      this.artistService.getAllArtists(),
      this.databaseService.getAllFavoriteItems(),
    ]);

    return {
      artists: artists.filter((artist) =>
        favoriteItems.artists.some((id) => id === artist.id),
      ),
      albums: albums.filter((album) =>
        favoriteItems.albums.some((id) => id === album.id),
      ),
      tracks: tracks.filter((track) =>
        favoriteItems.tracks.some((id) => id === track.id),
      ),
    };
  }

  public async removeFavoriteItem(id: string, type: FavoriteType) {
    const isFavoriteItem = this.databaseService
      .getAllFavoriteItems()
      [type].includes(id);

    if (!isFavoriteItem) {
      throw new NotFoundException(`Favorite ${type} with ID ${id} not found`);
    }

    this.databaseService.removeFavoriteItem(id, type);
  }
}
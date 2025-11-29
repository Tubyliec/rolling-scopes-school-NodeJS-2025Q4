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
import { ItemType } from './models/types/item-type.type';
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
    let item: ItemType;
    switch (type) {
      case 'artists':
        item = await this.artistService.getArtist(id);
        break;
      case 'albums':
        item = await this.albumService.getAlbum(id);
        break;
      case 'tracks':
        item = await this.trackService.getTrack(id);
        break;
    }
    if (!item) {
      throw new UnprocessableEntityException(
        `${type.toUpperCase()} with ID ${id} not found`,
      );
    }

    this.databaseService.createFavoriteItem(id, type);
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
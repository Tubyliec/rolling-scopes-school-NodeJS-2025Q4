import { Expose } from 'class-transformer';

import { ResponseAlbumDto } from '../../../album/models/dto/response-album.dto';
import { ResponseArtistDto } from '../../../artist/models/dto/response-artist.dto';
import { ResponseTrackDto } from '../../../track/models/dto/response-track.dto';

export class ResponseFavoriteDto {
  @Expose()
  artists: ResponseArtistDto[];
  @Expose()
  albums: ResponseAlbumDto[];
  @Expose()
  tracks: ResponseTrackDto[];
}

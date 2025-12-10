import { Album } from '../../../album/models/interfaces/album.interface.dto';
import { Artist } from '../../../artist/models/interfaces/artist.interface';
import { Track } from '../../../track/models/interfaces/track.interface';

export type ItemType = Artist | Track | Album;

import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseFavoriteDto } from './models/dto/response-favorite.dto';
import { FavoriteType } from './models/types/favorite-type';
import { ResponseArtistDto } from '../artist/models/dto/response-artist.dto';
import { ResponseAlbumDto } from '../album/models/dto/response-album.dto';
import { ResponseTrackDto } from '../track/models/dto/response-track.dto';

@Injectable()
export class FavoriteService {
  constructor(private prismaService: PrismaService) {}

  public async createFavoriteItem(id: string, type: FavoriteType) {
    await this.prismaService.favorite.upsert({
      where: { id: 1 },
      update: {},
      create: { id: 1 },
    });

    switch (type) {
      case 'artists': {
        const artist = await this.prismaService.artist.findUnique({
          where: { id },
        });
        if (!artist) {
          throw new UnprocessableEntityException(
            `Artist with ID ${id} not found`,
          );
        }
        try {
          await this.prismaService.favoriteArtist.create({
            data: {
              favorite: { connect: { id: 1 } },
              artist: { connect: { id } },
            },
          });
        } catch (error) {
          if (error.code !== 'P2002') {
            throw error;
          }
        }
        break;
      }

      case 'albums': {
        const album = await this.prismaService.album.findUnique({
          where: { id },
        });
        if (!album) {
          throw new UnprocessableEntityException(
            `Album with ID ${id} not found`,
          );
        }
        try {
          await this.prismaService.favoriteAlbum.create({
            data: {
              favorite: { connect: { id: 1 } },
              album: { connect: { id } },
            },
          });
        } catch (error) {
          if (error.code !== 'P2002') {
            throw error;
          }
        }
        break;
      }

      case 'tracks': {
        const track = await this.prismaService.track.findUnique({
          where: { id },
        });
        if (!track) {
          throw new UnprocessableEntityException(
            `Track with ID ${id} not found`,
          );
        }
        try {
          await this.prismaService.favoriteTrack.create({
            data: {
              favorite: { connect: { id: 1 } },
              track: { connect: { id } },
            },
          });
        } catch (error) {
          if (error.code !== 'P2002') {
            throw error;
          }
        }
        break;
      }
    }
  }

  async findAllFavoriteItems(): Promise<ResponseFavoriteDto> {
    const favorite = await this.prismaService.favorite.findUnique({
      where: { id: 1 },
      include: {
        favoriteArtists: {
          include: {
            artist: true,
          },
        },
        favoriteAlbums: {
          include: {
            album: true,
          },
        },
        favoriteTracks: {
          include: {
            track: true,
          },
        },
      },
    });

    if (!favorite) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    const artists = favorite.favoriteArtists.map((item) =>
      plainToInstance(ResponseArtistDto, item.artist),
    );
    const albums = favorite.favoriteAlbums.map((item) =>
      plainToInstance(ResponseAlbumDto, item.album),
    );
    const tracks = favorite.favoriteTracks.map((item) =>
      plainToInstance(ResponseTrackDto, item.track),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  public async removeFavoriteItem(id: string, type: FavoriteType) {
    try {
      const favorite = await this.prismaService.favorite.findUnique({
        where: { id: 1 },
      });
      if (!favorite) throw new NotFoundException('Favorites not found');
      switch (type) {
        case 'artists':
          const artist = await this.prismaService.favoriteArtist.findFirst({
            where: {
              favoriteId: 1,
              artistId: id,
            },
          });
          if (artist) {
            await this.prismaService.favoriteArtist.deleteMany({
              where: {
                favoriteId: 1,
                artistId: id,
              },
            });
          }
          break;

        case 'albums':
          const album = await this.prismaService.favoriteAlbum.findFirst({
            where: {
              favoriteId: 1,
              albumId: id,
            },
          });
          if (album) {
            await this.prismaService.favoriteAlbum.deleteMany({
              where: {
                favoriteId: 1,
                albumId: id,
              },
            });
          }
          break;

        case 'tracks':
          const track = await this.prismaService.favoriteTrack.findFirst({
            where: {
              favoriteId: 1,
              trackId: id,
            },
          });
          if (track) {
            await this.prismaService.favoriteTrack.deleteMany({
              where: {
                favoriteId: 1,
                trackId: id,
              },
            });
          }
          break;
        default:
          throw new NotFoundException(
            `Favorite ${type} with ID ${id} not found`,
          );
      }
    } catch (error) {
      if (error.code === 'P2025' || error.code === 'P2016') {
        throw new NotFoundException(`Favorite ${type} with ID ${id} not found`);
      }
      throw new Error(error);
    }
  }
}

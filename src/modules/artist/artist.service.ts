import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

import { CreateArtistDto } from './models/dto/create-artist.dto';
import { UpdateArtistDto } from './models/dto/update-artist.dto';
import { Artist } from './models/interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    private prismaService: PrismaService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  public async getAllArtists(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  public async getArtist(id: string): Promise<Artist> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  public async createArtist(artistData: CreateArtistDto): Promise<Artist> {
    return this.prismaService.artist.create({
      data: {
        id: v4(),
        ...artistData,
      },
    });
  }

  public async updateArtist(
    id: string,
    updateData: UpdateArtistDto,
  ): Promise<Artist> {
    try {
      return await this.prismaService.artist.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Artist with ID ${id} not found`);
      }
      throw error;
    }
  }

  public async deleteArtist(id: string): Promise<boolean> {
    try {
      await this.prismaService.track.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });

      await this.prismaService.album.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });

      await this.prismaService.artist.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Artist with ID ${id} not found`);
      }
      throw error;
    }
  }
}

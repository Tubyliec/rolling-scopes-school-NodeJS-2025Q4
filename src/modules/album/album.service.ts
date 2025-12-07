import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';

import { CreateAlbumDto } from './models/dto/create-album.dto';
import { UpdateAlbumDto } from './models/dto/update-album.dto';
import { Album } from './models/interfaces/album.interface.dto';

@Injectable()
export class AlbumService {
  constructor(private prismaService: PrismaService) {}

  public async getAllAlbums(): Promise<Album[]> {
    return this.prismaService.album.findMany();
  }

  public async getAlbum(id: string): Promise<Album> {
    const album = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  public async createAlbum(albumData: CreateAlbumDto): Promise<Album> {
    return this.prismaService.album.create({
      data: {
        id: v4(),
        ...albumData,
      },
    });
  }

  public async updateAlbum(
    id: string,
    updateData: UpdateAlbumDto,
  ): Promise<Album> {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Album with ID ${id} not found`);
      }
      throw error;
    }
  }

  public async deleteAlbum(id: string): Promise<boolean> {
    try {
      await this.prismaService.track.updateMany({
        where: { albumId: id },
        data: { albumId: null },
      });

      await this.prismaService.album.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Album with ID ${id} not found`);
      }
      throw error;
    }
  }
}

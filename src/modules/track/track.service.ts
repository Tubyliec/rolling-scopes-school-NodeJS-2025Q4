import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTrackDto } from './models/dto/create-track.dto';
import { UpdateTrackDto } from './models/dto/update-track.dto';
import { Track } from './models/interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}

  public async getAllTracks(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  public async getTrack(id: string): Promise<Track> {
    const track = await this.prismaService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  public async createTrack(trackData: CreateTrackDto): Promise<Track> {
    return this.prismaService.track.create({
      data: {
        id: v4(),
        ...trackData,
      },
    });
  }

  public async updateTrack(
    id: string,
    updateData: UpdateTrackDto,
  ): Promise<Track> {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Track with ID ${id} not found`);
      }
      throw error;
    }
  }

  public async deleteTrack(id: string): Promise<boolean> {
    try {
      await this.prismaService.track.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Track with ID ${id} not found`);
      }
      throw error;
    }
  }
}

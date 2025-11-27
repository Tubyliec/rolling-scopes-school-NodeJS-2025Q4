import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { v4 } from 'uuid';
import { Track } from './models/interfaces/track.interface';
import { CreateTrackDto } from './models/dto/create-track.dto';
import { UpdateTrackDto } from './models/dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService<Track>) {}

  public async getAllTracks(): Promise<Track[]> {
    return this.databaseService.getAllItems();
  }

  public async getTrack(id: string): Promise<Track> {
    const track: Track = this.databaseService.getItem(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  public async createTrack(trackRequest: CreateTrackDto): Promise<Track> {
    const track = {
      ...trackRequest,
      id: v4(),
    };
    return this.databaseService.createItem(track);
  }

  public async updateTrack(
    id: string,
    updateRequest: UpdateTrackDto,
  ): Promise<Track> {
    const track = this.databaseService.getItem(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    const updatedTrack = {
      ...track,
      name: updateRequest.name,
      artistId: updateRequest.artistId,
      albumId: updateRequest.albumId,
      duration: updateRequest.duration,
    };
    return this.databaseService.updateItem(id, updatedTrack);
  }

  public async deleteTrack(id: string): Promise<boolean> {
    const isTrackDeleted = this.databaseService.deleteItem(id);
    if (!isTrackDeleted) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return isTrackDeleted;
  }
}
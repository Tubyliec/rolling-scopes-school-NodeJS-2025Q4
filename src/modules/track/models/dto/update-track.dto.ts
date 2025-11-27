import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsUUID()
  albumId: string;

  @IsInt()
  duration: number;
}
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  artistId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  albumId: string;

  @IsInt()
  @ApiProperty()
  duration: number;
}
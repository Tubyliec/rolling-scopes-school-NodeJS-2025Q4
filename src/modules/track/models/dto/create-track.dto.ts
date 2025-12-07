import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateTrackDto {
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

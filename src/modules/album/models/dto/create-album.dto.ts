import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  year: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  artistId: string | null;
}

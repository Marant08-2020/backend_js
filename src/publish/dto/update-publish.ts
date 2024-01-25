import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class PublishUpdateDtoByEmail {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly title?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  readonly state?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly content?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly publishDate?: Date;
  @ApiPropertyOptional({ type: String, description: 'Email del autor del post' })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  readonly category?: string[];
  @ApiPropertyOptional({
    description: 'Solo del administrado puede cambiar de autor',
  })
  @IsOptional()
  @IsEmail()
  autor?: string;
}

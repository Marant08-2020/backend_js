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
  @IsNotEmpty()
  readonly publishDate?: Date;
  @ApiPropertyOptional({
    description:
      'Email del autor del post y Solo del administrado puede cambiar de autor',
  })
  @IsOptional()
  @IsEmail()
  autor?: string;
  @IsNotEmpty()
  @ApiPropertyOptional({
    type: [String],
    description: 'La categoria en un arreglo por ejemplo: ["Arte", "Ciencia"]',
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  readonly category?: string[];
}

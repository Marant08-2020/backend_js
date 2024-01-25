import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class PublishDtoByEmail {
  @IsOptional()
  @IsNumber()
  id: number;
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly content: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly publishDate: Date;
  @ApiProperty({ type: String, description: 'Email del autor del post' })
  @IsArray()
  @IsNotEmpty()
  readonly category: string[];
}

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
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly title: string;
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly content: string;
  @IsOptional()
  @IsDateString()
  readonly publishDate: Date;
  @IsArray()
  @IsNotEmpty()
  readonly category: string[];
}

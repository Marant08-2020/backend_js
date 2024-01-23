import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class PublishUpdateDtoByEmail {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly title?: string;
  @IsOptional()
  @IsNotEmpty()
  readonly state?: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  readonly content?: string;
  @IsOptional()
  @IsDateString()
  readonly publishDate?: Date;
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  readonly category?: string[];
  @IsOptional()
  @IsEmail()
  autor?: string;
}

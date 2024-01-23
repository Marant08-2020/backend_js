import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsPositive } from 'class-validator';
export class FilterParamsDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;
  @IsOptional()
  @IsEmail()
  @Type(() => String)
  autor: string;
  @IsOptional()
  @IsArray()
  category: string[];
}

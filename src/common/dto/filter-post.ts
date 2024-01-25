import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsPositive } from 'class-validator';
import { State } from '../enums/state.enum';

export class filterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;
}
export class FilterParamsDto extends filterDto {
  @ApiPropertyOptional({ description: 'Email del autor' })
  @IsOptional()
  @IsEmail()
  @Type(() => String)
  autor: string;
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  category: string[];
}
export class QueryDtoUser {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;
}
export class QueryDtoPostState extends QueryDtoUser {
  @ApiProperty({ enum: State })
  state: State;
}


import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  id?: number;
  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly name?: string;
  @ApiPropertyOptional()
  @IsStrongPassword()
  readonly password?: string;
  @ApiPropertyOptional()
  @IsEmail()
  readonly email?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role: string;
  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  readonly apellidos?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'El id se genera en automático no es necesario enviarlo en el objeto USER',
  })
  id: number;
  @Transform(({ value }) => value.trim())
  @IsString()
  name: string;
  @IsStrongPassword()
  password: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  role: string;
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  apellidos: string;
}

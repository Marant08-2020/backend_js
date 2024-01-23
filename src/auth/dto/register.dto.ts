import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsObject,
  IsEmail,
  IsStrongPassword,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsNumber()
  @IsOptional()
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
  @IsOptional()
  @IsObject()
  details: {
    apellidos: string;
    rol: string;
  };
}

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly email: string;
  @ApiPropertyOptional()
  readonly apellidos: string;
}

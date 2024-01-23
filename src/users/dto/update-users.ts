export class UpdateUserDto {
  id?: number;
  readonly name?: string;
  readonly password?: string;
  readonly email?: string;
  readonly details?: {
    apellidos?: string;
    rol?: string;
  };
}

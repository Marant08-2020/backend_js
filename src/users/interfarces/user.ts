import { Role } from '../../common/enums/rol.enum';

export interface User {
  name: string;
  password: string;
  email: string;
  role: Role;
  apellidos: string;
}

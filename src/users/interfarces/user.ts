import { Role } from '../../common/enums/rol.enum';

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  role: Role;
  apellidos: string;
}

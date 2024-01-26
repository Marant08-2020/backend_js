import { Role } from '../../../common/enums/rol.enum';
import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    id: 1,
    name: 'Martin',
    email: 'test@example.com',
    password: 'Pollo24#',
    apellidos: 'Velez Castro',
    role: Role.ADMIN,
  };
};

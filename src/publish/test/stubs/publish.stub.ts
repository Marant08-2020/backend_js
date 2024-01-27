import { Types } from 'mongoose';
import { State } from '../../../common/enums/state.enum';
import { Publish } from '../../schemas/publish.shema';
import { userStub } from '../../../users/test/stubs/user.stub';

const arr = new Types.Array('string');
const date = new Date(2024, 1, 1);

export const publishStub = (): Publish => {
  return {
    id: 1,
    title: 'El test de pruebas',
    content: 'Este es un post de prueba para el proyecto Blog hecho en NestJS',
    state: State.ACTIVE,
    publishDate: date,
    category: arr,
    autor: userStub(),
  };
};

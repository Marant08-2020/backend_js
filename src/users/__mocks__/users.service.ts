import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockResolvedValue(userStub()),
  findOnebyPassword: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  findOneId: jest.fn().mockResolvedValue(userStub()),
  userOneById: jest.fn().mockResolvedValue(userStub()),
  findOnebyId: jest.fn().mockResolvedValue(userStub()),
  updateById: jest.fn().mockResolvedValue(userStub()),
  removeById: jest.fn().mockResolvedValue(userStub()),
  valUser: jest.fn().mockResolvedValue(userStub()),
  existUserByEmail: jest.fn().mockResolvedValue(userStub()),
});

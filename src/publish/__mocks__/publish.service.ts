import { publishStub } from '../test/stubs/publish.stub';

export const PublishService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(publishStub()),
  findOneById: jest.fn().mockResolvedValue(publishStub()),
  findOne: jest.fn().mockResolvedValue(publishStub()),
  findAll: jest.fn().mockResolvedValue(publishStub()),
  remove: jest.fn().mockResolvedValue(publishStub()),
  updateById: jest.fn().mockResolvedValue(publishStub()),
  findByIdAutor: jest.fn().mockResolvedValue(publishStub()),
  setAutor: jest.fn().mockResolvedValue(publishStub()),
  searchByText: jest.fn().mockResolvedValue(publishStub()),
  filterPost: jest.fn().mockResolvedValue(publishStub()),
  filterByState: jest.fn().mockResolvedValue(publishStub()),
});

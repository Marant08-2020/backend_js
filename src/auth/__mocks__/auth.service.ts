import { userStub } from '../../users/test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  register: jest.fn().mockResolvedValue(userStub()),
  login: jest.fn().mockResolvedValue(userStub()),
  profile: jest.fn().mockResolvedValue(userStub()),
});

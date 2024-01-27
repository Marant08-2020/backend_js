import { CanActivate } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { User } from 'src/users/schemas/user.schema';
import { RegisterDto } from '../dto/register.dto';
import { Role } from '../../common/enums/rol.enum';
import { userStub } from '../../users/test/stubs/user.stub';
import { LoginDto } from '../dto/login.dto';
import { AccessTokenInterface } from '../../common/interfaces/acces-token.interface';

jest.mock('../auth.service');
describe('AuthController', () => {
  let usersService: UsersService;
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const mock_ForceFailGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_ForceFailGuard)
      .compile();
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });
  describe('Register', () => {
    describe('when register is called', () => {
      let user: User;
      let registerUserDto: RegisterDto;
      beforeEach(async () => {
        registerUserDto = {
          id: 1,
          name: 'Martin',
          email: 'test@example.com',
          password: 'Pollo24#',
          apellidos: 'Velez Castro',
          role: Role.ADMIN,
        };
        user = await authController.register(registerUserDto);
      });
      test('then it should call authService', () => {
        expect(authService.register).toHaveBeenCalledWith(registerUserDto);
      });
      test('then it should return a new user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('Login', () => {
    describe('when login is called', () => {
      let loginDto: LoginDto;
      let accessToken: AccessTokenInterface;
      beforeEach(async () => {
        loginDto = {
          email: 'test@example.com',
          password: 'Pollo24#',
        };
        accessToken = await authController.login(loginDto);
      });
      test('then it should call authService', () => {
        expect(authService.login).toHaveBeenCalledWith(loginDto);
      });
    });
  });

});

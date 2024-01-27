import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { ActiveUserInterface } from '../../common/interfaces/active-user.interface';
import { Role } from '../../common/enums/rol.enum';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { QueryDtoUser } from '../../common/dto/filter-post';
import { UpdateUserDto } from '../dto/update-users';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mock_ForceFailGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_ForceFailGuard)
      .compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  describe('findOne', () => {
    describe('when finsOne is called', () => {
      let userObj: User;
      let id: number;
      let activeUser: ActiveUserInterface;
      beforeEach(async () => {
        id = userStub().id;
        activeUser = {
          email: 'test@example.com',
          role: Role.ADMIN,
          id: 1,
        };
        userObj = await usersController.findOne(id, activeUser);
      });
      test('then it should call usersService', () => {
        expect(usersService.findOnebyId).toHaveBeenCalledWith(id, activeUser);
      });
      test('then is should return a user', () => {
        expect(userObj).toEqual(userStub());
      });
    });
  });
  describe('findAll', () => {
    describe('when findAll is called', () => {
      let usersObjects: User[];
      let queryParams: QueryDtoUser;
      beforeEach(async () => {
        queryParams = {
          limit: 10,
          page: 2,
        };
        usersObjects = await usersController.findAll(queryParams);
      });
      test('then it should call usersService', () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });
      test('then it should return users', () => {
        expect([usersObjects]).toEqual([userStub()]);
      });
    });
  });

  describe('updateById', () => {
    describe('when updateById is called', () => {
      let userObj: User;
      let id: number;
      let activeUser: ActiveUserInterface;
      let updateUserDto: UpdateUserDto;
      beforeEach(async () => {
        id = userStub().id;
        activeUser = {
          email: 'test@example.com',
          role: Role.ADMIN,
          id: 1,
        };
        updateUserDto = {
          name: 'Jose Jose',
          role: Role.ADMIN,
          apellidos: 'Perez Prado',
        };
        userObj = await usersController.updateById(
          updateUserDto,
          id,
          activeUser,
        );
      });
      test('then it should call usersService', () => {
        expect(usersService.updateById).toHaveBeenCalledWith(
          updateUserDto,
          id,
          activeUser,
        );
      });

      test('then it should return a user', () => {
        expect(userObj).toEqual(userStub());
      });
    });
  });

  describe('removeById', () => {
    describe('when removeById is called', () => {
      let userObj: User;
      let id: number;
      beforeEach(async () => {
        id = userStub().id;
        userObj = await usersController.removeById(id);
      });
      test('then it should call usersService', () => {
        expect(usersService.removeById).toHaveBeenCalledWith(id);
      });
      test('then it should return a user', () => {
        expect(userObj).toEqual(userStub());
      });
    });
  });
});

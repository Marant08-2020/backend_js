import { CanActivate } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { PublishController } from '../publish.controller';
import { PublishService } from '../publish.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { Publish } from '../schemas/publish.shema';
import { publishStub } from './stubs/publish.stub';
import { filterDto } from '../../common/dto/filter-post';
import { PublishDtoByEmail } from '../dto/publish-by-email';
import { Role } from '../../common/enums/rol.enum';
import { ActiveUserInterface } from '../../common/interfaces/active-user.interface';
import { PublishUpdateDtoByEmail } from '../dto/update-publish';

jest.mock('../publish.service');

describe('PublishController', () => {
  let usersService: UsersService;
  let publishController: PublishController;
  let publishService: PublishService;

  beforeEach(async () => {
    const mock_ForceFailGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [PublishController],
      providers: [PublishService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_ForceFailGuard)
      .compile();
    publishController = moduleRef.get<PublishController>(PublishController);
    publishService = moduleRef.get<PublishService>(PublishService);
    jest.clearAllMocks();
  });
  describe('findOne', () => {
    describe('When findOne is called', () => {
      let post: Publish;
      beforeEach(async () => {
        post = await publishController.findOne(publishStub().id);
      });
      test('then it should call PublishService', () => {
        expect(publishService.findOneById).toHaveBeenCalledWith(
          publishStub().id,
        );
      });
      test('then is should return a post', () => {
        expect(post).toEqual(publishStub());
      });
    });
  });

  describe('findByUserId', () => {
    describe('When findByUserId is called', () => {
      let post: object;
      let queryParams: filterDto;
      beforeEach(async () => {
        queryParams = {
          limit: 10,
          page: 2,
        };
        post = await publishController.findByUserId(
          publishStub().autor.id,
          queryParams,
        );
      });
      test('then it should call PublishService', () => {
        expect(publishService.findByIdAutor).toHaveBeenCalledWith(
          publishStub().autor.id,
          queryParams,
        );
      });
      test('then is should return a post', () => {
        expect(post).toEqual(publishStub());
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let usersObjects: Publish[];
      let queryParams: filterDto;
      beforeEach(async () => {
        queryParams = {
          limit: 10,
          page: 2,
        };
        usersObjects = await publishController.findAll(queryParams);
      });
      test('then it should call pusblishService', () => {
        expect(publishService.findAll).toHaveBeenCalled();
      });
      test('then it should return post', () => {
        expect([usersObjects]).toEqual([publishStub()]);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let post: Publish;
      let createPostDto: PublishDtoByEmail;
      let activeUser: ActiveUserInterface;
      const dateTest = new Date(2024, 1, 1);
      beforeEach(async () => {
        activeUser = {
          email: 'test@example.com',
          role: Role.ADMIN,
          id: 1,
        };
        createPostDto = {
          id: 0,
          title: 'El caso 2',
          content: 'Haber si ahora el caso sirve',
          publishDate: dateTest,
          autor: 'test_create@mail.com',
          category: ['ciencia', 'arte'],
        };
        post = await publishController.create(createPostDto, activeUser);
      });
      test('then it should call pusblishService', () => {
        expect(publishService.create).toHaveBeenCalledWith(
          createPostDto,
          activeUser,
        );
      });
      test('then it should return a post', () => {
        expect(post).toEqual(publishStub());
      });
    });
  });

  describe('updatePost', () => {
    describe('when create is called', () => {
      let post: Publish;
      let updatePostDto: PublishUpdateDtoByEmail;
      let activeUser: ActiveUserInterface;
      const dateTest = new Date(2024, 1, 1);
      beforeEach(async () => {
        activeUser = {
          email: 'test@example.com',
          role: Role.ADMIN,
          id: 1,
        };
        updatePostDto = {
          title: 'El caso 2',
          content: 'Haber si ahora el caso sirve',
          publishDate: dateTest,
          autor: 'test_create@mail.com',
          category: ['ciencia', 'arte'],
        };
        post = await publishController.update(
          publishStub().id,
          updatePostDto,
          activeUser,
        );
      });
      test('then it should call pusblishService', () => {
        expect(publishService.updateById).toHaveBeenCalledWith(
          publishStub().id,
          updatePostDto,
          activeUser,
        );
      });
      test('then it should return a post', () => {
        expect(post).toEqual(publishStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove a post is called', () => {
      let post: Publish;
      let activeUser: ActiveUserInterface;
      beforeEach(async () => {
        activeUser = {
          email: 'test@example.com',
          role: Role.ADMIN,
          id: 1,
        };
        post = await publishController.remove(publishStub().id, activeUser);
      });
      test('then it should call publishService', () => {
        expect(publishService.remove).toHaveBeenCalledWith(
          publishStub().id,
          activeUser,
        );
      });
      test('then it should return a user', () => {
        expect(post).toEqual(publishStub());
      });
    });
  });






});

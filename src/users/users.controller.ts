import { Controller, Param, Get, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfarces/user';
import { CreateUserDto } from './dto/create-users';
import { UpdateUserDto } from './dto/update-users';
import { Role } from '../common/enums/rol.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { FilterParamsDto } from '../common/dto/filter-post';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Auth(Role.ADMIN)
  @Get()
  findAll(@Query() queryParams: FilterParamsDto): Promise<User[]> {
    return this.usersService.findAll(queryParams);
  }
  @Auth(Role.USER)
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @ActiveUser() user: ActiveUserInterface,
  ): Promise<User> {
    return this.usersService.findOnebyId(id, user);
  }

  @Auth(Role.USER)
  @Put(':id')
  updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
    @ActiveUser() user: ActiveUserInterface,
  ): Promise<User> {
    return this.usersService.updateById(updateUserDto, id, user);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  removeById(@Param('id') id: number) {
    return this.usersService.removeById(id);
  }
}

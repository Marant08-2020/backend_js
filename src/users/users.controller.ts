import {
  Controller,
  Param,
  Get,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfarces/user';
import { UpdateUserDto } from './dto/update-users';
import { Role } from '../common/enums/rol.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { QueryDtoUser } from '../common/dto/filter-post';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  @Get()
  findAll(@Query() queryParams: QueryDtoUser): Promise<User[]> {
    return this.usersService.findAll(queryParams);
  }
  @ApiBearerAuth()
  @Auth(Role.USER)
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @ActiveUser() user: ActiveUserInterface,
  ): Promise<User> {
    return this.usersService.findOnebyId(id, user);
  }

  @ApiBearerAuth()
  @Auth(Role.USER)
  @Put(':id')
  updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
    @ActiveUser() user: ActiveUserInterface,
  ): Promise<User> {
    return this.usersService.updateById(updateUserDto, id, user);
  }

  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  @Delete(':id')
  removeById(@Param('id') id: number) {
    return this.usersService.removeById(id);
  }
}

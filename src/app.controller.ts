import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';
import { Role } from './common/enums/rol.enum';
import { User } from './users/schemas/user.schema';
import { FilterParamsDto, QueryDtoPostState, QueryDtoUser } from './common/dto/filter-post';
import { ApiBearerAuth, ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Administración')
@Auth(Role.ADMIN)
@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getUsers(@Query() queryParams: QueryDtoUser): Promise<User[]> {
    console.log(queryParams);
    return this.appService.getUsers(queryParams);
  }
  @Delete('/users/:id')
  deleteUser(@Param('id') id: number) {
    return this.appService.deleteUser(id);
  }
  @Get('/post')
  getPostByState(@Query() queryParams: QueryDtoPostState) {
    return this.appService.getPostByState(queryParams);
  }
}

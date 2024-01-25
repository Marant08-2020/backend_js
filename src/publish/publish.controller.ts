import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PublishDtoByEmail } from './dto/publish-by-email';
import { PublishService } from './publish.service';
import { Publish } from './schemas/publish.shema';
import { PublishUpdateDtoByEmail } from './dto/update-publish';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { FilterParamsDto, filterDto } from '../common/dto/filter-post';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('post')
export class PublishController {
  constructor(private publishService: PublishService) {}
  @Get()
  findAll(@Query() params: filterDto) {
    return this.publishService.findAll(params);
  }
  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: number, @Query() params: filterDto) {
    return this.publishService.findByIdAutor(userId, params);
  }
  @ApiBearerAuth()
  @Auth(Role.USER)
  @Post()
  create(
    @Body() createPublish: PublishDtoByEmail,
    @ActiveUser() userActive: ActiveUserInterface,
  ) {
    return this.publishService.create(createPublish, userActive);
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Publish> {
    return this.publishService.findOneById(id);
  }
  @ApiBearerAuth()
  @Auth(Role.USER)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @ActiveUser() userActive: ActiveUserInterface,
  ) {
    return this.publishService.remove(id, userActive);
  }
  @ApiBearerAuth()
  @Auth(Role.USER)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePost: PublishUpdateDtoByEmail,
    @ActiveUser() userActive: ActiveUserInterface,
  ): Promise<Publish> {
    return this.publishService.updateById(id, updatePost, userActive);
  }
}

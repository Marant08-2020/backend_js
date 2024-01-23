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
import { FilterParamsDto } from '../common/dto/filter-post';

@Controller('post')
export class PublishController {
  constructor(private publishService: PublishService) {}
  @Get('/filter')
  postFilte(@Query() queryParams: FilterParamsDto) {
    console.log(queryParams);
    return this.publishService.filterPost(queryParams);
  }
  @Get()
  findAll(@Query() params: FilterParamsDto) {
    return this.publishService.findAll(params);
  }
  @Get('/user/:userId')
  findByUserId(
    @Param('userId') userId: number,
    @Query() params: FilterParamsDto,
  ) {
    return this.publishService.findByIdAutor(userId, params);
  }
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
  @Auth(Role.USER)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @ActiveUser() userActive: ActiveUserInterface,
  ) {
    return this.publishService.remove(id, userActive);
  }
  @Auth(Role.USER)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePost: PublishUpdateDtoByEmail,
    @ActiveUser() userActive: ActiveUserInterface,
  ): Promise<Publish> {
    return this.publishService.updateById(id, updatePost, userActive);
  }
  @Get('/search/:text')
  searchText(@Param('text') text: string, @Query() params: FilterParamsDto) {
    return this.publishService.searchByText(text, params);
  }
}

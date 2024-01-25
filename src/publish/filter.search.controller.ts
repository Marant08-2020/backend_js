import { PublishUpdateDtoByEmail } from './dto/update-publish';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { FilterParamsDto, filterDto } from '../common/dto/filter-post';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublishService } from './publish.service';
import { Controller, Get, Param, Query } from '@nestjs/common';

@ApiTags('Búsqueda y filtardo')
@Controller('posting')
export class FilterSearchController {
  constructor(private publishService: PublishService) {}
  @Get('/filter')
  postFilter(@Query() queryParams: FilterParamsDto) {
    return this.publishService.filterPost(queryParams);
  }
  @Get('/search/:text')
  searchText(@Param('text') text: string, @Query() params: filterDto) {
    return this.publishService.searchByText(text, params);
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { PublishService } from './publish/publish.service';
import { User } from './users/schemas/user.schema';
import { QueryDtoPostState, QueryDtoUser } from './common/dto/filter-post';

@Injectable()
export class AppService {
  constructor(
    private userService: UsersService,
    private postService: PublishService,
  ) {}
  getUsers(queryParams: QueryDtoUser): Promise<User[]> {
    return this.userService.findAll(queryParams);
  }
  deleteUser(id: number) {
    return this.userService.removeById(id);
  }
  getPostByState(queryParams: QueryDtoPostState) {
    return this.postService.filterByState(queryParams);
  }
}

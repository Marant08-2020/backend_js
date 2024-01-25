import { Model, Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-users';
import { UpdateUserDto } from './dto/update-users';
import { CounterService } from '../counters/counter.service';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { Role } from '../common/enums/rol.enum';
import { QueryDtoUser } from '../common/dto/filter-post';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private counterService: CounterService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto['id'] = await this.counterService.getNextSequence('userid');
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findAll(queryParams: QueryDtoUser): Promise<User[]> {
    const { page = 1, limit = 10 } = queryParams;
    return this.userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
  }
  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).lean();
  }
  async findOnebyPassword(email: string): Promise<User> {
    return this.userModel
      .findOne(
        { email: email },
        {
          projection: { email: 0, password: 0 },
        },
      )
      .lean();
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.updateOne({ email: email }, updateUserDto).lean();
  }
  async findOneId(email: string): Promise<Types.ObjectId> {
    return await this.userModel.findOne({ email: email }, { _id: 1 }).lean();
  }
  async userOneById(id: number): Promise<Types.ObjectId> {
    return await this.userModel.findOne({ id: id }, { _id: 1 }).lean();
  }
  async findOnebyId(id: number, user: ActiveUserInterface): Promise<User> {
    const userId = await this.userModel.findOne({ id: id }).lean();
    await this.valUser(id, user.id, user.role);
    return userId;
  }
  async updateById(
    updateUserDto: UpdateUserDto,
    id: number,
    user: ActiveUserInterface,
  ): Promise<User> {
    await this.valUser(id, user.id, user.role);
    await this.existUserByEmail(id, updateUserDto.email);
    if (user.role == Role.ADMIN && id == user.id) {
      updateUserDto['role'] = user.role;
    }
    const userUpdate = await this.userModel
      .findOneAndUpdate({ id: id }, updateUserDto, { new: true })
      .lean();
    if (updateUserDto.password) {
      await this.userModel.findOne({ id: id }).then(function (doc) {
        doc.password = updateUserDto.password;
        doc.save();
      });
    }
    return userUpdate;
  }
  async removeById(id: number) {
    if (!(await this.userModel.findOne({ id: id }))) {
      throw new NotFoundException('User does not exist');
    }
    const removeUser = this.userModel.findOneAndDelete({ id: id });
    return removeUser;
  }

  async valUser(id: number, id_active: number, role: string) {
    if (role === Role.USER && id != id_active) {
      throw new UnauthorizedException('User is wrong');
    }
  }
  async existUserByEmail(id: number, email: string) {
    const user = await this.userModel
      .find({ id: { $ne: id } })
      .select({ email: 1, _id: 0 });
    const isMail = user.find((record) => record.email === email);
    if (isMail) {
      throw new BadRequestException('User already exists');
    }
  }
}

import { FilterQuery, Model, Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publish } from './schemas/publish.shema';
import { UsersService } from '../users/users.service';
import { PublishDtoByEmail } from './dto/publish-by-email';
import { PublishUpdateDtoByEmail } from './dto/update-publish';
import { CounterService } from '../counters/counter.service';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { FilterParamsDto } from '../common/dto/filter-post';
import { Role } from '../common/enums/rol.enum';
import { State } from '../common/enums/state.enum';

@Injectable()
export class PublishService {
  constructor(
    @InjectModel(Publish.name) private publishModel: Model<Publish>,
    private readonly usersService: UsersService,
    private counterService: CounterService,
  ) {}
  async create(
    createPublish: PublishDtoByEmail,
    userActive: ActiveUserInterface,
  ): Promise<Publish> {
    const userId = await this.usersService.findOneId(userActive.email);
    if (!userId) {
      throw new BadRequestException('Author does not exist');
    }
    const createdPublish = new this.publishModel({
      id: await this.counterService.getNextSequence('publishid'),
      title: createPublish.title,
      content: createPublish.content,
      publishDate: createPublish.publishDate,
      autor: userId,
      category: createPublish.category,
    });
    return await createdPublish.save();
  }
  async findOneById(id: number): Promise<Publish> {
    const post = await this.publishModel
      .findOne({ id: id })
      .populate({
        path: 'autor',
        select: '-password -role -_id -email',
      })
      .exec();
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }
    return post;
  }
  async findOne(id: string): Promise<Publish> {
    try {
      const _id = new Types.ObjectId(id);
      const publish = await this.publishModel
        .findOne({ _id: _id })
        .populate({ path: 'autor', select: '-password' })
        .exec();
      if (!publish) {
        throw new NotFoundException('Publish does not exist');
      }
      return publish;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findAll(params: FilterParamsDto): Promise<Publish[]> {
    const { page = 1, limit = 10 } = params;
    return this.publishModel
      .find()
      .populate({ path: 'autor', select: '-password -role -id -_id -email' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
  }
  async remove(id: number, userActive: ActiveUserInterface) {
    const post = await this.findOneById(id);
    await this.usersService.valUser(
      post.autor.id,
      userActive.id,
      userActive.role,
    );
    return this.publishModel.findOneAndDelete({ id: id });
  }
  async updateById(
    id: number,
    updatePost: PublishUpdateDtoByEmail,
    userActive: ActiveUserInterface,
  ): Promise<Publish> {
    const post = await this.findOneById(id);
    await this.usersService.valUser(
      post.autor.id,
      userActive.id,
      userActive.role,
    );
    updatePost['autor'] = await this.setAutor(userActive, post.autor.email);
    const userId = await this.usersService.findOneId(updatePost.autor);
    if (!userId) {
      throw new BadRequestException('Author does not exist');
    }
    delete updatePost.autor;
    const publish = await this.publishModel
      .findOneAndUpdate(
        { id: id },
        {
          $set: { ...updatePost, autor: userId },
        },
        { new: true },
      )
      .exec();
    if (!publish) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return publish;
  }
  async findByIdAutor(userId: number, params: FilterParamsDto) {
    const { page = 1, limit = 10 } = params;
    const user = await this.usersService.userOneById(userId);
    if (!user) {
      throw new BadRequestException('Author does not exist');
    }
    return this.publishModel
      .find({ autor: user._id })
      .populate({ path: 'autor', select: '-password -role -id -_id -email' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
  }
  async setAutor(
    userActive: ActiveUserInterface,
    postAutorEmail: string,
  ): Promise<string> {
    if (userActive.role === Role.USER) {
      return userActive.email;
    } else if (userActive.role === Role.ADMIN) {
      return postAutorEmail;
    }
  }
  async searchByText(text: string, params: FilterParamsDto) {
    const { page = 1, limit = 10 } = params;
    return this.publishModel
      .find({ $text: { $search: text } })
      .populate({ path: 'autor', select: '-password -role -id -_id -email' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
  }
  async filterPost(params: FilterParamsDto): Promise<Publish[]> {
    const { page = 1, limit = 10 } = params;
    if (params) {
      const filters: FilterQuery<Publish> = {};
      const { limit, page } = params;
      const { autor, category } = params;
      if (autor) {
        const user = await this.usersService.findOneId(autor);
        filters.autor = user;
      }
      if (category) {
        filters.category = { $in: category };
      }
      if (category && autor) {
        const user = await this.usersService.findOneId(autor);
        filters.$and = [{ category: { $in: category } }, { autor: user }];
      }
      return this.publishModel
        .find(filters)
        .populate({ path: 'autor', select: '-password -role -id -_id -email' })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ id: 1 })
        .exec();
    }

    return this.publishModel
      .find()
      .populate({ path: 'autor', select: '-password -role -id -_id -email' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
  }
  async filterByState(params: FilterParamsDto) {
    const { page = 1, limit = 10 } = params;
    const filters: FilterQuery<Publish> = {};
    filters.$or = [{ state: State.DELETE }, { state: State.EDIT }];
    return this.publishModel
      .find(filters)
      .populate({ path: 'autor', select: '-password -role -id -_id -email' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
  }
}

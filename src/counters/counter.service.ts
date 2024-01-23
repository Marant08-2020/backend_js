import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Counter } from './schemas/counter.schema';
import { CreateCounterDto } from './dto/create-counter';
import { Model } from 'mongoose';

@Injectable()
export class CounterService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}

  async create(createCounterDto: CreateCounterDto): Promise<Counter> {
    const createdCounter = new this.counterModel(createCounterDto);
    return createdCounter.save();
  }

  async find_id(_id: string): Promise<Counter> {
    return this.counterModel.findOne({ _id: _id }).lean();
  }

  async getNextSequence(name: string): Promise<number> {
    const existCounter = await this.find_id(name);
    if (!existCounter) {
      console.log(name);
      await this.create({
        _id: name,
        seq: 0,
      });
    }
    const ret = await this.counterModel.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return ret.seq;
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publish, PublishSchema } from './schemas/publish.shema';
import { PublishController } from './publish.controller';
import { PublishService } from './publish.service';
import { UsersModule } from '../users/users.module';
import { CounterModule } from '../counters/counter.module';
import { FilterSearchController } from './filter.search.controller';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Publish.name, schema: PublishSchema }]),
    CounterModule,
  ],
  controllers: [PublishController, FilterSearchController],
  providers: [PublishService],
  exports: [PublishService],
})
export class PublishModule {}

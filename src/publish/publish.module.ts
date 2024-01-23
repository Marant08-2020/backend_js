import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Publish, PublishSchema } from './schemas/publish.shema';
import { PublishController } from './publish.controller';
import { PublishService } from './publish.service';
import { UsersModule } from '../users/users.module';
import { CounterModule } from '../counters/counter.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Publish.name, schema: PublishSchema }]),
    CounterModule,
  ],
  controllers: [PublishController],
  providers: [PublishService],
  exports: [PublishService],
})
export class PublishModule {}

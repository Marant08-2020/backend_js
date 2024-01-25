import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { State } from '../../common/enums/state.enum';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<Publish>;

@Schema()
export class Publish {
  @Prop({ type: Number, index: { unique: true } })
  id: number;
  @ApiProperty()
  @Prop({ type: String, required: true })
  title: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  content: string;
  @ApiPropertyOptional()
  @Prop({ type: String, default: State.ACTIVE })
  state: string;
  @ApiPropertyOptional()
  @Prop({ type: Date, default: Date.now })
  publishDate: Date;
  @ApiProperty({
    type: [String],
    description:
      'Un arreglo de categorias ejemplo: una ["ciencia"] o mas ["ciencia", "arte"] ',
  })
  @Prop({ type: [String], required: true })
  category: Types.Array<string>;
  @ApiProperty({ type: String, description: 'Email del autor del post' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  autor: User;
}

export const PublishSchema = SchemaFactory.createForClass(Publish);

PublishSchema.index({
  title: 'text',
  content: 'text',
});

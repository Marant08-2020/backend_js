import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { State } from '../../common/enums/state.enum';
import { User } from '../../users/schemas/user.schema';

export type UserDocument = HydratedDocument<Publish>;

@Schema()
export class Publish {
  @Prop({ type: Number, index: { unique: true } })
  id: number;
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: String, default: State.ACTIVE })
  state: string;
  @Prop({ type: Date, default: Date.now })
  publishDate: Date;
  @Prop({ type: [String], required: true })
  category: Types.Array<string>;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  autor: User;
}

export const PublishSchema = SchemaFactory.createForClass(Publish);

PublishSchema.index({
  title: 'text',
  content: 'text',
});

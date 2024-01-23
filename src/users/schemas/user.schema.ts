import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../../common/enums/rol.enum';
const SALT_WORK_FACTOR = 10;

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: Number, index: { unique: true } })
  id: number;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, select: false })
  password: string;
  @Prop({ type: String, required: true, default: Role.USER, enum: Role })
  role: Role;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: Object })
  details: {
    apellidos: string;
    rol: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  const user = this as any;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

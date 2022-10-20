import { model, Schema } from 'mongoose';
import { User } from '@interfaces/users.interface';

const UserSchema: Schema = new Schema({
  telegramId: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
  },
  uninversityId: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  autoReserve: {
    type: Boolean,
    default: false,
  },
  autoReservesDay: {
    type: [Number],
    default: [],
  },
});

const userModel = model<User>('User', UserSchema);

export default userModel;

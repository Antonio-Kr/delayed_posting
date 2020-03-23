import * as mongoose from 'mongoose';
import { sha512 } from 'js-sha512';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name field is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name field is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    trim: true,
    validate: email =>
      /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      ),
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    trim: true,
    minlength: 6,
    validate: [
      password =>
        /^(?=.*[0-9])(?=.*[\w])(?=.*[\W])[\d\W\w\s]{6,}$/.test(password),
      '',
      'easy password',
    ],
  },
  timezone: {
    type: String,
    required: [true, 'Timezone field is required'],
    trim: true,
  },
  avatar: {
    type: String,
  },
  avatarId: {
    type: Number,
  },
  registerOk:{
    type: String,
    default:'peding',
  },
});

UserSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  user.password = sha512(user.password);
  next();
});

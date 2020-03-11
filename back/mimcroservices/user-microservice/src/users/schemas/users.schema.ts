import * as mongoose from 'mongoose';
// import * as bcrypt from 'bcrypt';
import { sha512 } from 'js-sha512';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  avatarId: {
    type: Number,
  },
});

UserSchema.pre('save', function(next) {
  let user = this;

  console.log('before save');
  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();

  user.password = sha512(user.password);
  console.log(user.password);
  next();
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) return next(err);
  //   bcrypt.hash(user.password, salt, (err, hash) => {
  //     if (err) return next(err);
  //     user.password = hash;
  //     next();
  //   });
  // });
});

UserSchema.methods.checkPassword = function(attempt, callback) {
  let user = this;
  if (sha512(attempt) === user.password) {
    return true;
  }

  // bcrypt.compare(attempt, user.password, (err, isMatch) => {
  //   if (err) return callback(err);
  //   callback(null, isMatch);
  // });
};

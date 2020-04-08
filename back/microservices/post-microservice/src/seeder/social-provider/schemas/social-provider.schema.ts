import * as mongoose from 'mongoose';

export const SocialProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoLink: {
    type: String,
    required: true,
  },
});

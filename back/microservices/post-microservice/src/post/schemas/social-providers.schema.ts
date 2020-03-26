import * as mongoose from 'mongoose';

export const SocialProvidersSchema = new mongoose.Schema({
  providers: {
    type: Object,
  },
});

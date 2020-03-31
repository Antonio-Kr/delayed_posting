import * as mongoose from 'mongoose';

export const SocialConnectionSchema = new mongoose.Schema(
  {
    providerId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

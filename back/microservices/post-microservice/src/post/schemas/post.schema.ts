import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    templateId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

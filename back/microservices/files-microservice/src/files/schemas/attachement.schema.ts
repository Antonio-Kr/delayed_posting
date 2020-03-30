import * as mongoose from 'mongoose';

export const AttachementSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    default: '0',
  },
  contentType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

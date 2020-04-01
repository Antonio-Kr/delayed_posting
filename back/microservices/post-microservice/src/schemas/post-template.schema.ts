import * as mongoose from 'mongoose';

export const PostTemplateSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  attachements: {
    img: {
      type: Boolean,
      required: true,
    },
    video: {
      type: Boolean,
      required: true,
    },
  },
  title: {
    type: Boolean,
    required: true,
  },
  body: {
    text: {
      type: Boolean,
      required: true,
    },
    html: {
      type: Boolean,
      required: true,
    },
  },
});

import * as mongoose from 'mongoose';

export const ScheduleSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  startsAt: {
    type: Date,
    required: true,
  },
  notify: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

import { Document } from 'mongoose';

export interface ISchedule extends Document {
  _id: string|undefined;
  providerId: string;
  postId: string;
  userId: string;
  startsAt: Date;
  notify: boolean;
  status: string;
}

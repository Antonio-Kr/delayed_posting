import { Document } from 'mongoose';

export interface IAttachement extends Document {
  link: string;
  fileId: string;
  contentType: string;
  postId: string;
  createdAt: Date;
}

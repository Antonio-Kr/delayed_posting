import { Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
  attachements: string[];
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

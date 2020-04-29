import { Document } from 'mongoose';

export interface IPostTemplate extends Document {
  providerId: string;
  attachements: {
    img: boolean;
    video: boolean;
  };
  title: boolean;
  body: {
    text: boolean;
    html: boolean;
  };
}

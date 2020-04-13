import { Document } from 'mongoose';

export interface ISocialProvider extends Document {
  name: string;
  logoLink: string;
}

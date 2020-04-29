import { Document } from 'mongoose';

export interface ILinkedInSocialConnection extends Document {
  providerId: string;
  userId: string;
  token: string;
  expiresAt: string;
}

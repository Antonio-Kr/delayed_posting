import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_DELAYED_POSTING_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/delayed_posting'),
  },
];

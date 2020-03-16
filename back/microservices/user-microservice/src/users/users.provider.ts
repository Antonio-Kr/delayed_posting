import { Connection } from 'mongoose';
import { UserSchema } from './schemas/users.schema';
import { databaseConstants } from 'src/constants';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [databaseConstants.databaseConnection],
  },
];

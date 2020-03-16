import { Connection } from 'mongoose';
import { TokenSchema } from './schemas/token.schema';
import { databaseConstants } from 'src/constants';

export const authProvider = [
  {
    provide: 'TOKEN_MODEL',
    useFactory: (conncetion: Connection) =>
      conncetion.model('Token', TokenSchema),
    inject: [databaseConstants.databaseConnection],
  },
];

import { Connection } from 'mongoose';
import { AttachementSchema } from './schemas/attachement.schema';
import { databaseConstants } from 'src/constants';

export const fileProvider = [
  {
    provide: 'ATTACHEMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Attachement', AttachementSchema),
    inject: [databaseConstants.databaseConnection],
  },
];

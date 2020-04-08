import { Connection } from 'mongoose';
import { PostSchema } from './schemas/post.schema';
import { databaseConstants } from 'src/constants';

export const postProvider = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Post', PostSchema),
    inject: [databaseConstants.databaseConnection],
  },
];

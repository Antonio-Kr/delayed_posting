import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { FilesModule } from './files/files.module';
import { PostModule } from './post/post.module';
import { SocialConnectionsModule } from './social-connections/social-connections.module';

import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    FilesModule,
    PostModule,
    SocialConnectionsModule,
    SchedulesModule,
  ],
})
export class AppModule {}

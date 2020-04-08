import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { SocialConnectionsModule } from './social-connections/social-connections.module';

@Module({
  imports: [UserModule, PostModule, SocialConnectionsModule],
})
export class AppModule {}

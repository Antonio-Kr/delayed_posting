import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { FilesModule } from './files/files.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, TokenModule, FilesModule, PostModule],
})
export class AppModule {}

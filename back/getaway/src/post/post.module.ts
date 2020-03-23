import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [PostService, FilesService],
  controllers: [PostController],
})
export class PostModule {}

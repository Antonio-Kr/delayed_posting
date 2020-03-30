import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { SocialProvidersSchema } from './schemas/social-providers.schema';
import { PostTemplateSchema } from './schemas/post-template.schema';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'SocialProvider', schema: SocialProvidersSchema },
      { name: 'PostTemplate', schema: PostTemplateSchema },
    ]),
  ],
})
export class PostModule {}

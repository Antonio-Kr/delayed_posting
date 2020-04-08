import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostTemplateSchema } from '../schemas/post-template.schema';
import { SocialProvidersSchema } from './schemas/social-providers.schema';
import { SocialProviderSchema } from 'src/seeder/social-provider/schemas/social-provider.schema';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'SocialProviders', schema: SocialProvidersSchema },
      { name: 'PostTemplate', schema: PostTemplateSchema },
      { name: 'SocialProvider', schema: SocialProviderSchema },
    ]),
  ],
})
export class PostModule {}

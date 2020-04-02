import { Module } from '@nestjs/common';
import { PostTemplateSeederService } from './post-template.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostTemplateSchema } from 'src/schemas/post-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PostTemplate', schema: PostTemplateSchema },
    ]),
  ],
  providers: [PostTemplateSeederService],
  exports: [PostTemplateSeederService],
})
export class PostTemplateSeederModule {}

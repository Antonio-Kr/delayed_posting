import { Module, Logger } from '@nestjs/common';
import { SocialProviderSeederModule } from './social-provider/social-provider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Seeder } from './seeder';
import { PostTemplateSeederModule } from './post-template/post-template.module';

@Module({
  imports: [SocialProviderSeederModule, PostTemplateSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}

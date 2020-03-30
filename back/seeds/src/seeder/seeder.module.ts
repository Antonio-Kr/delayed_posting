import { Module, Logger } from '@nestjs/common';
import { SocialProviderSeederModule } from './social-provider/social-provider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Seeder } from './seeder';
import { PostTemplateModule } from './post-template/post-template.module';

@Module({
  imports: [
    SocialProviderSeederModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
    PostTemplateModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}

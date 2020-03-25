import { Module, Logger } from '@nestjs/common';
import { SocialProviderSeederModule } from './social-provider/social-provider.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Seeder } from './seeder';

@Module({
  imports: [
    SocialProviderSeederModule,
    MongooseModule.forRoot('mongodb://localhost/delayed_posting'),
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}

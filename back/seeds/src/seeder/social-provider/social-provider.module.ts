import { Module } from '@nestjs/common';
import { SocialProviderSeederService } from './social-provider.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialProviderSchema } from '../schemas/social-provider.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SocialProvider', schema: SocialProviderSchema },
    ]),
  ],
  providers: [SocialProviderSeederService],
  exports: [SocialProviderSeederService],
})
export class SocialProviderSeederModule {}

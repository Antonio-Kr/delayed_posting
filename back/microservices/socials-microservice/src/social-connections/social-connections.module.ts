import { Module } from '@nestjs/common';
import { SocialConnectionsController } from './social-connections.controller';
import { SocialConnectionsService } from './social-connections.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialConnectionSchema } from './schemas/social-connection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SocialConnection', schema: SocialConnectionSchema },
    ]),
  ],
  controllers: [SocialConnectionsController],
  providers: [SocialConnectionsService],
})
export class SocialConnectionsModule {}

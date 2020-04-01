import { Module } from '@nestjs/common';
import { SocialConnectionsController } from './social-connections.controller';
import { SocialConnectionsService } from './social-connections.service';

@Module({
  controllers: [SocialConnectionsController],
  providers: [SocialConnectionsService]
})
export class SocialConnectionsModule {}

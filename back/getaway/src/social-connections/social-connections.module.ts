import { Module } from '@nestjs/common';
import { SocialConnectionsService } from './social-connections.service';
import { SocialConnectionsController } from './social-connections.controller';

@Module({
  providers: [SocialConnectionsService],
  controllers: [SocialConnectionsController]
})
export class SocialConnectionsModule {}

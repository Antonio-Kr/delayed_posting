import { Controller, Post, Body } from '@nestjs/common';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';

@Controller('social')
export class SocialConnectionsController {
  constructor(
    private readonly socialConnectionService: SocialConnectionsService,
  ) {}

  @Post('linkedin')
  async linkedInLogin(@Body() socialConnection) {
    const linkedInSocialConnection: ILinkedInSocialConnection = {
      userId: socialConnection.userId,
      expiresAt: socialConnection.expires_at,
      providerId: socialConnection.providerId,
      token: socialConnection.token,
    };
    return this.socialConnectionService.linkedInLogin(linkedInSocialConnection);
  }
}

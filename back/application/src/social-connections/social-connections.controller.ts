import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';
import * as fetch from 'node-fetch';

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

  @Post('linkedin/me')
  async linkedInMe(@Body() token) {
    return await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          Connection: 'Keep-Alive',
          Authorization: `Bearer ${token.token}`,
        },
      },
    ).then(response => response.json());
  }

  @Get('link')
  async linkedIN(@Query() code) {
    return code;
  }
}

// https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7803ckbs49p3y1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsocial%2Flink&scope=r_liteprofile%20r_emailaddress%20w_member_social

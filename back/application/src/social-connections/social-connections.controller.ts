import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';
import * as fetch from 'node-fetch';

@Controller('social')
export class SocialConnectionsController {
  constructor(
    private readonly socialConnectionService: SocialConnectionsService,
  ) {}

  @Get('connections')
  async getConnections(@Query('email') email) {
    return await this.socialConnectionService.getConnections(email);
  }

  @Post('linkedin')
  async linkedInLogin(@Body() linkedInLoginData) {
    const tokenJson = await fetch(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        method: 'POST',
        body: `grant_type=authorization_code&code=${linkedInLoginData.code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsocial%2Flink&client_id=7803ckbs49p3y1&client_secret=K08EiU9nzLihZjrw`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    ).then(result => result.json());

    const expires_inSeconds = new Date().getSeconds() + tokenJson.expires_in;

    const linkedInSocialConnection: ILinkedInSocialConnection = {
      userId: linkedInLoginData.email,
      expiresAt: new Date(expires_inSeconds).toString(),
      providerId: linkedInLoginData.providerId,
      token: tokenJson.access_token,
    };

    return await this.socialConnectionService.linkedInLogin(
      linkedInSocialConnection,
    );
  }
}
import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';
import * as fetch from 'node-fetch';

@Controller('social')
export class SocialConnectionsController {
  constructor(
    private readonly socialConnectionService: SocialConnectionsService,
  ) {}

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

    const linkedInSocialConnection: ILinkedInSocialConnection = {
      userId: linkedInLoginData.email,
      expiresAt: new Date(tokenJson.expires_in).toString(),
      providerId: linkedInLoginData.providerId,
      token: tokenJson.token,
    };
    return await this.socialConnectionService.linkedInLogin(
      linkedInSocialConnection,
    );
  }
}

// https://www.linkedin.com/oauth/v2/authorization?
//    response_type=code&
//    client_id=7803ckbs49p3y1&
//    redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsocial%2Flink&
//    scope=r_liteprofile%20r_emailaddress%20w_member_social

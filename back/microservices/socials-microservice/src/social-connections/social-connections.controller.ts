import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';

@Controller()
export class SocialConnectionsController {
  constructor(
    private readonly socialConnetionsService: SocialConnectionsService,
  ) {}

  @MessagePattern('linkedInLogin')
  async linkedInLogin(socialConnection: ILinkedInSocialConnection) {
    console.log(socialConnection);
    await this.socialConnetionsService
      .updateUserIdByEmail(socialConnection.userId)
      .then(user => (socialConnection.userId = user._id));
    console.log(socialConnection);
    return await this.socialConnetionsService.createSocialConnection(
      socialConnection,
    );
  }
}

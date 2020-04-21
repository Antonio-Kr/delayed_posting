import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';

@Controller()
export class SocialConnectionsController {
  constructor(
    private readonly socialConnetionsService: SocialConnectionsService,
  ) {}

  @MessagePattern('getConnections')
  async getConnections(email) {
    const userId = await this.socialConnetionsService
      .userIdByEmail(email)
      .then(user => user._id);
    return await this.socialConnetionsService.getConnections(userId);
  }

  @MessagePattern('linkedInLogin')
  async linkedInLogin(socialConnection: ILinkedInSocialConnection) {
    await this.socialConnetionsService
      .userIdByEmail(socialConnection.userId)
      .then(user => (socialConnection.userId = user._id));
    return await this.socialConnetionsService.createSocialConnection(
      socialConnection,
    );
  }

  @MessagePattern('getToken')
  async getToken(userId:string){
    return await this.socialConnetionsService.getToken(userId);
  }
}

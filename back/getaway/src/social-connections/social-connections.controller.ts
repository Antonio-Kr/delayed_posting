import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { SocialConnectionsService } from './social-connections.service';
import { UserService } from 'src/user/user.service';

@Controller('social')
export class SocialConnectionsController {
  constructor(
    private readonly socialConnectionService: SocialConnectionsService,
  ) {}

  @MessagePattern('linkedInLogin')
  async linkedInLogin(socialConnection: ILinkedInSocialConnection) {
    return this.socialConnectionService.linkedInLogin(socialConnection);
  }
}

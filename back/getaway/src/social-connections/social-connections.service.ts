import { Injectable } from '@nestjs/common';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { connectionConstants } from 'src/constants';

@Injectable()
export class SocialConnectionsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.socialProvidersPort,
      },
    });
  }

  async linkedInLogin(socialConnection: ILinkedInSocialConnection) {
    return this.client.send<any, ILinkedInSocialConnection>(
      'linkedInLogin',
      socialConnection,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { connectionConstants } from 'src/constants';
import { ISocialConnection } from './interfaces/social-connection.interface';

@Injectable()
export class SocialConnectionsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.getawayPort,
      },
    });
  }

  async getConnections(email: string) {
    return this.client.send<Promise<ISocialConnection[]>, string>(
      'getConnections',
      email,
    );
  }

  async linkedInLogin(linkedInSocialConnection: ILinkedInSocialConnection) {
    return this.client.send<any, ILinkedInSocialConnection>(
      'linkedInLogin',
      linkedInSocialConnection,
    );
  }

  async methodCode(code:string){
    return code;
  }
}

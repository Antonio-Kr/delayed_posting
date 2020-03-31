import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { connectionConstants } from 'src/constants';
import { IUser } from './interfaces/users.interface';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SocialConnectionsService {
  private client: ClientProxy;

  constructor(
    @InjectModel('SocialConnection')
    private socialConnectionModel: Model<ILinkedInSocialConnection>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.userMicroservicePort,
      },
    });
  }
  async updateUserIdByEmail(email: string): Promise<IUser> {
    console.log(email);
    return await this.client
      .send<IUser, string>('findOneByEmail', email)
      .toPromise();
  }

  async createSocialConnection(
    createSocialConnectionDto: ILinkedInSocialConnection,
  ) {
    const createdSocialConnection = new this.socialConnectionModel(
      createSocialConnectionDto,
    );
    return await createdSocialConnection.save();
  }
}

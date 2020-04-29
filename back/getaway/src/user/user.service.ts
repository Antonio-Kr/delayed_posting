import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { IUser } from './interfaces/user.interface';
import { IUserUpdate } from './interfaces/user-update.interface';
import { connectionConstants } from 'src/constants';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.userMicroservicePort,
      },
    });
  }

  async register(user: IUser) {
    return await this.client.send<IUser, IUser>('register', user).toPromise();
  }

  async forgotPassword(email: string) {
    return await this.client
      .send<string, string>('forgotPassword', email)
      .toPromise();
  }

  async userUpdate(userUpdate: IUserUpdate) {
    if (userUpdate.firstName || userUpdate.lastName || userUpdate.timezone) {
      return await this.client
        .send<IUser, IUserUpdate>('userUpdate', userUpdate)
        .toPromise();
    } else if (userUpdate.password && userUpdate.newPassword) {
      return await this.client
        .send<any, IUserUpdate>('passwordUpdate', userUpdate)
        .toPromise();
    } else if (userUpdate.avatar) {
      return await this.client
        .send<IUser, IUserUpdate>('avatarUpdate', userUpdate)
        .toPromise();
    } else if (userUpdate.avatar == null || userUpdate.avatar == '') {
      return await this.client
        .send<IUser, IUserUpdate>('avatarDelete', userUpdate)
        .toPromise();
    } else {
      return 'error';
    }
  }
}

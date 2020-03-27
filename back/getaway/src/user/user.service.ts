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

  register(user: IUser) {
    return this.client.send<IUser, IUser>('register', user).toPromise();
  }
  forgotPassword(email: string) {
    return this.client
      .send<string, string>('forgotPassword', email)
      .toPromise();
  }
  userUpdate(userUpdate: IUserUpdate) {
    if(userUpdate.firstName||userUpdate.lastName||userUpdate.timezone){
      return this.client.send<IUser, IUserUpdate>('userUpdate', userUpdate).toPromise();
    }
    else if(userUpdate.password&&userUpdate.newPassword){
      return this.client.send<IUser, IUserUpdate>('passwordUpdate', userUpdate).toPromise();
    }
    else if(userUpdate.avatar){
      return this.client.send<IUser, IUserUpdate>('avatarUpdate', userUpdate).toPromise();
    }
    else if(userUpdate.avatar==null||userUpdate.avatar==""){
      return this.client.send<IUser, IUserUpdate>('avatarDelete', userUpdate).toPromise();
    }
    else { 
      return 'error';
    }
  }
}

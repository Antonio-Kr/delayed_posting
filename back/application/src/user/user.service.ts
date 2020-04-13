import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IUserUpdate } from './interfaces/user-update.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
require('dotenv').config();
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { ITokenCheck } from './interfaces/token-check.interface';
import { connectionConstants } from 'src/constants';
@Injectable()
export class UserService {
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

  login(user: LoginUserDto) {
    return this.client
      .send<Promise<IJwtToken>, LoginUserDto>('login', user)
      .toPromise();
  }

  register(user: IUser) {
    return this.client
      .send<Promise<IUser>, IUser>('register', user)
      .toPromise();
  }

  tokenCheck(token: ITokenCheck) {
    return this.client
      .send<Promise<IJwtToken>, ITokenCheck>('tokenCheck', token)
      .toPromise();
  }

  tokenRegisterOk(token: ITokenCheck) {
    return this.client
      .send<Promise<IJwtToken>, ITokenCheck>('tokenRegisterOk', token)
      .toPromise();
  }

  forgotPassword(email) {
    return this.client.send<string, string>('forgotPassword', email);
  }

  userUpdate(userUpdate: IUserUpdate) {
    return this.client.send<IUser, IUserUpdate>('userUpdateAll', userUpdate);
  }

  userDelete(token: ITokenCheck) {
    return this.client.send<string, ITokenCheck>('userDelete', token);
  }

  userInfo(token: ITokenCheck) {
    return this.client.send<any, ITokenCheck>('userInfo', token);
  }
}

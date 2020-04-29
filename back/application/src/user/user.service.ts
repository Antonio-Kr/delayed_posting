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

  async login(user: LoginUserDto) {
    return await this.client
      .send<Promise<IJwtToken>, LoginUserDto>('login', user)
      .toPromise();
  }

  async register(user: IUser) {
    return await this.client
      .send<Promise<IUser>, IUser>('register', user)
      .toPromise();
  }

  async tokenCheck(token: ITokenCheck) {
    return await this.client
      .send<Promise<IJwtToken>, ITokenCheck>('tokenCheck', token)
      .toPromise();
  }

  async tokenRegisterOk(token: ITokenCheck) {
    return await this.client
      .send<Promise<IJwtToken>, ITokenCheck>('tokenRegisterOk', token)
      .toPromise();
  }

  async forgotPassword(email) {
    return await this.client
      .send<string, string>('forgotPassword', email)
      .toPromise();
  }

  async userUpdate(userUpdate: IUserUpdate) {
    return await this.client
      .send<IUser, IUserUpdate>('userUpdateAll', userUpdate)
      .toPromise();
  }

  async userDelete(token: ITokenCheck) {
    return await this.client
      .send<string, ITokenCheck>('userDelete', token)
      .toPromise();
  }

  async userInfo(token: ITokenCheck) {
    return await this.client
      .send<any, ITokenCheck>('userInfo', token)
      .toPromise();
  }
}

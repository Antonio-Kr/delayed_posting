import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { IToken } from './interfaces/token-check.interface';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }

  public login(user: LoginUserDto) {
    return this.client
      .send<Promise<IJwtToken>, LoginUserDto>('login', user)
      .toPromise()
      .catch();
  }

  public register(user: IUser) {
    return this.client
      .send<Promise<IUser>, IUser>('register', user)
      .toPromise()
      .catch();
  }

  public tokenCheck(token: IToken) {
    console.log(token);
    return this.client
      .send<Promise<IJwtToken>, IToken>('tokenCheck', token)
      .toPromise()
      .catch();
  }

  public forgotPassword(email) {
    return this.client.send<string, string>('forgotPassword', email);
  }
}

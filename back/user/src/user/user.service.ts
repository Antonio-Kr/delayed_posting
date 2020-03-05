import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';

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

  public login(user: IUser) {
    return this.client.send<string, IUser>('login', user);
  }

  public register(user: IUser) {
    return this.client.send<string, IUser>('register', user);
  }

  public forgotPassword(email: string) {
    return this.client.send<string, string>('register', email);
  }
}

import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
  }

  register(user: IUser) {
    return this.client.send<IUser, IUser>('register', user);
  }
}

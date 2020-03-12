import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
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
    return this.client.send<IUser, IUser>('register', user).toPromise();
  }
  forgotPassword(email: string) {
    return this.client
      .send<string, string>('forgotPassword', email)
      .toPromise();
  }
}

import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';

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
    return this.client.send<IUser, IUser>('register', user).toPromise();
  }

  login(loginUserDto: LoginUserDto) {
    return this.client
      .send<IJwtToken, LoginUserDto>('login', loginUserDto)
      .toPromise();
  }

  forgot(email:string){
    return this.client
      .send<Promise<IUser>, string>('forgotPassword', email)
      .toPromise();
  }

  confirm(email:string){
    return this.client
      .send<Promise<IUser>, string>('confirmPassword', email).toPromise();
  }
}

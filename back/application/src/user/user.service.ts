import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
require('dotenv').config();
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';

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
      .toPromise();
  }

  public register(user: IUser) {
    return this.client
      .send<Promise<IUser>, IUser>('register', user)
      .toPromise();
  }

  public forgot(email:string){
    return this.client
      .send<Promise<IUser>, string>('forgot', email)
      .toPromise();
  }

  public confirm(email:string){
    return this.client
      .send<Promise<IUser>, string>('confirm', email)
      .toPromise();
  }

  public pages():string{
    return `<h2>Hello, User! ${process.env.HOME_URL}`;
  }

  public query(login:string, pass:string){
    return `Вы подтвердили адрес электронной почты. Для возврата на страницу нажмите<a href="${process.env.HOME_URL}">Домой</a>`;
  }
}

import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { IToken } from './interfaces/token-check.interface';

@Injectable()
export class TokenService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8879,
      },
    });
  }
  login(loginUserDto: LoginUserDto) {
    return this.client
      .send<IJwtToken, LoginUserDto>('login', loginUserDto)
      .toPromise();
  }
  tokenCheck(token: IToken) {
    return this.client.send<IJwtToken, IToken>('tokenCheck', token).toPromise();
  }
}

import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ITokenCheck } from './interfaces/token-check.interface';
import { connectionConstants } from 'src/constants';

@Injectable()
export class TokenService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: connectionConstants.host,
        port: connectionConstants.tokenMicroservicePort,
      },
    });
  }
  login(loginUserDto: LoginUserDto) {
    return this.client
      .send<IJwtToken, LoginUserDto>('login', loginUserDto)
      .toPromise();
  }
  tokenCheck(token: ITokenCheck) {
    return this.client
      .send<IJwtToken, ITokenCheck>('tokenCheck', token)
      .toPromise();
  }
  tokenRegisterOk(token: ITokenCheck) {
    return this.client
      .send<IJwtToken, ITokenCheck>('tokenRegisterOk', token)
      .toPromise();
  }
  userDelete(token:ITokenCheck){
    return this.client.send<IJwtToken, ITokenCheck>('userDelete', token).toPromise();
  }
  userInfo(token:ITokenCheck){
    return this.client.send<any, ITokenCheck>('userInfo', token).toPromise();
  }
}

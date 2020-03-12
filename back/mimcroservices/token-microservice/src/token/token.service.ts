import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { TokenDto } from './dto/token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IToken } from './interfaces/token.interface';
import { IUser } from './interfaces/user.interface';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { sha512 } from 'js-sha512';

@Injectable()
export class TokenService {
  private client: ClientProxy;

  constructor(
    private jwtService: JwtService,
    @InjectModel('Token') private tokenModel: Model<IToken>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
  }

  async saveToken(tokenDto: TokenDto): Promise<IToken> {
    let createdToken = new this.tokenModel(tokenDto);
    return await createdToken.save();
  }

  async tokenCheck(token: string): Promise<IToken> {
    let tokenItem = await this.tokenModel.findOne({ token: token });
    console.log(tokenItem);
    return tokenItem;
  }

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    let userToAttempt = await this.client
      .send<IUser, string>('findOneByEmail', loginAttempt.email)
      .toPromise();
    return await new Promise(resolve => {
      if (userToAttempt.password == sha512(loginAttempt.password)) {
        resolve(this.createJwtPayload(userToAttempt));
      } else {
        throw new UnauthorizedException();
      }
    });
  }

  async validateUserByJwt(payload: IJwtPayload) {
    let user: any = await this.client.send<any, string>(
      'findOneByEmail',
      payload.email,
    );

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  private createJwtPayload(user) {
    let data: IJwtPayload = {
      email: user.email,
    };

    let jwt = this.jwtService.sign(data);

    let jwtToken: IJwtToken = {
      expiresIn: 86400,
      token: jwt,
    };

    return jwtToken;
  }
}

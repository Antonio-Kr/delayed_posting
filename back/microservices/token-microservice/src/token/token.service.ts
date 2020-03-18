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
import { ITokenCheck } from './interfaces/token-check.interface';

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

  async saveToken(token: string): Promise<IToken> {
    let createdToken = await this.createTokenModel(token);
    console.log(createdToken);
    return await createdToken.save();
  }

  async tokenCheck(token: ITokenCheck): Promise<IJwtToken> {
    return await this.tokenModel.findOne({ token: token.token });
  }

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    let userToAttempt = await this.takeUserByEmail(loginAttempt.email);
    return await new Promise(async (resolve, reject) => {
      if (
        userToAttempt &&
        (await userToAttempt).password == sha512(loginAttempt.password)
      ) {
        resolve(this.createJwtPayload(userToAttempt));
      } else {
        reject(new UnauthorizedException());
      }
    });
  }

  async validateUserByJwt(payload: IJwtPayload) {
    let user: any = this.takeUserByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  async takeUserByEmail(email) {
    return await this.client
      .send<IUser, string>('findOneByEmail', email)
      .toPromise();
  }

  createJwtPayload(user) {
    let data: IJwtPayload = {
      email: user.email,
    };

    let jwt = this.jwtService.sign(data);

    let jwtToken: IJwtToken = {
      email: user.email,
      expiresIn: 86400,
      token: jwt,
    };

    return jwtToken;
  }

  async createTokenModel(token: string) {
    return new Promise(resolve => {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tokenDto: TokenDto = {
        token: token,
        createdAt: new Date(),
        expires: tomorrow,
      };
      resolve(tokenDto);
    })
      .then(result => new this.tokenModel(result))
      .catch(result => result.message);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { TokenDto } from './dto/token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IToken } from './interfaces/token.interface.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('Token') private tokenModel: Model<IToken>,
  ) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    let userToAttempt = await this.usersService.findOneByEmail(
      loginAttempt.email,
    );

    return new Promise(resolve => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if (err) {
          throw new UnauthorizedException();
        }
        if (isMatch) {
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }

  async saveToken(tokenDto: TokenDto): Promise<IToken> {
    let createdToken = new this.tokenModel(tokenDto);
    return await createdToken.save();
  }

  async validateUserByJwt(payload: IJwtPayload) {
    let user = await this.usersService.findOneByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IJwtToken } from './interfaces/jwt-token.interface';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
      expiresIn: 3600,
      token: jwt,
    };

    return jwtToken;
  }
}

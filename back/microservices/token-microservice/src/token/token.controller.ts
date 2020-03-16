import { Controller, Post, Body, Request } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoginUserDto } from './dto/login-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { ITokenCheck } from './interfaces/token-check.interface';

@Controller()
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @MessagePattern('login')
  async login(loginUserDto: LoginUserDto) {
    let jwt: any = await this.tokenService
      .validateUserByPassword(loginUserDto)
      .catch(result => result.message);
    if (!jwt.error) {
      console.log('hello world');
      await this.tokenService.saveToken((jwt as IJwtToken).token);
    }
    return jwt;
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: ITokenCheck) {
    let tokenItem: any = await this.tokenService.tokenCheck(token);
    if (tokenItem) {
      if (this.isTokenValid(tokenItem)) {
        let user = await this.tokenService.takeUserByEmail(token.email);
        tokenItem = await this.tokenService.createJwtPayload(user);
        await this.tokenService.saveToken((tokenItem as IJwtToken).token);
      } else {
        tokenItem = null;
      }
    }
    return tokenItem;
  }

  isTokenValid(tokenItem) {
    return new Date(tokenItem.expires) > new Date();
  }
}

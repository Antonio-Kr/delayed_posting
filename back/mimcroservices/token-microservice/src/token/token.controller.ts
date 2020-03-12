import { Controller, Post, Body, Request } from '@nestjs/common';
import { TokenService } from './token.service';
import { LoginUserDto } from './dto/login-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { TokenDto } from './dto/token.dto';

@Controller()
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @MessagePattern('login')
  async login(loginUserDto: LoginUserDto) {
    let jwt = await this.tokenService.validateUserByPassword(loginUserDto);

    await new Promise(resolve => {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tokenDto: TokenDto = {
        token: (jwt as IJwtToken).token,
        createdAt: new Date(),
        expires: tomorrow,
      };
      this.tokenService.saveToken(tokenDto);
      resolve(true);
    }).catch(result => result.message);

    return jwt;
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: string) {
    return await this.tokenService.tokenCheck(token);
  }
}

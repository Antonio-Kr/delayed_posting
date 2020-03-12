import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { IJwtToken } from './interfaces/jwt-token.interface';
import { TokenDto } from './dto/token.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('login')
  async login(loginUserDto: LoginUserDto) {
    let jwt = await this.authService.validateUserByPassword(loginUserDto);

    let x = new Promise(() => {
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      let tokenDto: TokenDto = {
        token: (jwt as IJwtToken).token,
        createdAt: new Date(),
        expires: tomorrow,
      };
      this.authService.saveToken(tokenDto);
    }).catch(result => result.message);

    return jwt;
  }
}

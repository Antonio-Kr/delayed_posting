import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('login')
  async login(loginUserDto: LoginUserDto) {
    return await this.authService
      .validateUserByPassword(loginUserDto)
      .catch(result => result.message);
  }
}

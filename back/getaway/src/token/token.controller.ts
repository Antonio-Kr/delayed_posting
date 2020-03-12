import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('login')
  async login(user: LoginUserDto) {
    return this.tokenService.login(user);
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: string) {
    return this.tokenService.tokenCheck(token);
  }
}

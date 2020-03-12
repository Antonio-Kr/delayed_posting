import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from './token.service';
import { IToken } from './interfaces/token-check.interface';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('login')
  async login(user: LoginUserDto) {
    return this.tokenService.login(user);
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: IToken) {
    return this.tokenService.tokenCheck(token);
  }
}

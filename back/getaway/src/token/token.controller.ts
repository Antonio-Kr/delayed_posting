import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from './token.service';
import { ITokenCheck } from './interfaces/token-check.interface';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('login')
  async login(user: LoginUserDto) {
    return this.tokenService.login(user);
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: ITokenCheck) {
    return this.tokenService.tokenCheck(token);
  }

  @MessagePattern('tokenRegisterOk')
  async tokenRegisterOk(token: ITokenCheck) {
    return this.tokenService.tokenRegisterOk(token);
  }

  @MessagePattern('userDelete')
  async userDelete(token: ITokenCheck) {
    return this.tokenService.userDelete(token);
  }

  @MessagePattern('userInfo')
  async userInfo(token: ITokenCheck) {
    return this.tokenService.userInfo(token);
  }
}

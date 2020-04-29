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
    return await this.tokenService.login(user);
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: ITokenCheck) {
    return await this.tokenService.tokenCheck(token);
  }

  @MessagePattern('tokenRegisterOk')
  async tokenRegisterOk(token: ITokenCheck) {
    return await this.tokenService.tokenRegisterOk(token);
  }

  @MessagePattern('userDelete')
  async userDelete(token: ITokenCheck) {
    return await this.tokenService.userDelete(token);
  }

  @MessagePattern('userInfo')
  async userInfo(token: ITokenCheck) {
    return await this.tokenService.userInfo(token);
  }
}

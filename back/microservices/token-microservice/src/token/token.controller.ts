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
      .catch((result) => result.message);
    if (!jwt.error) {
      await this.tokenService.saveToken((jwt as IJwtToken).token);
    }
    return jwt;
  }

  @MessagePattern('tokenCheck')
  async tokenCheck(token: ITokenCheck) {
    let tokenItem = await this.tokenService.tokenCheck(token);
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

  @MessagePattern('tokenRegisterOk')
  async tokenRegisterOk(token: ITokenCheck) {
    let x = await this.tokenCheck(token);
    if (x) {
      let ok = await this.tokenService.sendOk(x);
      if (ok) {
        return 'Вы подтвердили адрес электронной почты. Для возврата на страницу нажмите <a href="http://localhost:3000">Домой</a>`;';
      }
    }
  }

  @MessagePattern('tokenRegister')
  async tokenRegister(email: string) {
    let user = await this.tokenService.takeUserByEmail(email);
    let token = await this.tokenService.createJwtPayload(user);
    await this.tokenService.saveToken((token as IJwtToken).token);
    return await token;
  }

  @MessagePattern('userDelete')
  async userDelete(token: ITokenCheck) {
    let tokenCheck = await this.tokenCheck(token);
    if (!tokenCheck) {
      return 'error';
    }
    return await this.tokenService.userDelete(token.email);
  }

  @MessagePattern('userInfo')
  async userInfo(token: ITokenCheck) {
    let tokenCheck = await this.tokenCheck(token);
    if (!tokenCheck) {
      return 'error';
    }
    return await this.tokenService.takeInfoFromUser(token.email);
  }

  isTokenValid(tokenItem) {
    return new Date(tokenItem.expires) > new Date();
  }
}

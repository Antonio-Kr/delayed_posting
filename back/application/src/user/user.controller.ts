import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { ITokenCheck } from './interfaces/token-check.interface';
import { IUserUpdate } from './interfaces/user-update.interface';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('user') user: LoginUserDto) {
    return this.userService.login(user);
  }

  @Post('register')
  async register(@Body('user') user: IUser) {
    return this.userService.register(user);
  }

  @Post()
  async tokenCheck(@Body('token') token: ITokenCheck) {
    return this.userService.tokenCheck(token);
  }

  @Post('info')
  async user(@Body('token') token: ITokenCheck) {
    return this.userService.userInfo(token);
  }

  @Get('token')
  async token(@Query() token: ITokenCheck) {
    return this.userService.tokenRegisterOk(token);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Patch('profile')
  async updateUser(@Body('updateUser') userUpdate: IUserUpdate) {
    return this.userService.userUpdate(userUpdate);
  }

  @Delete('profile')
  async deleteUser(@Body('deleteUser') token: ITokenCheck) {
    return this.userService.userDelete(token);
  }
}

//  https://www.linkedin.com/oauth/v2/authorization?
//      response_type=code&
//      client_id=<app_id>& /* 7803ckbs49p3y1 */
//      redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Flinkedin&
//      scope=r_liteprofile%20r_emailaddress%20w_member_social

//  https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7803ckbs49p3y1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Flinkedin&scope=r_liteprofile%20r_emailaddress%20w_member_social

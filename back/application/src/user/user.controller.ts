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
  async user(@Body('info') info: ITokenCheck) {
    return this.userService.userInfo(info);
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

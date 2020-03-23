import { Controller, Post, Body, Get, Query, Patch, Delete } from '@nestjs/common';
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

  @Get('token')
  async token(@Query() token:ITokenCheck) {
    return this.userService.tokenRegisterOk(token);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Patch('profile')
  async updateUser(@Body('updateUser') userUpdate:IUserUpdate){
    return this.userService.userUpdate(userUpdate);
  }

  // @Patch('profile')
  // async updateAvatar(@Body('updateAvatar') avatarUpdate:IUserUpdate){
  //   return this.userService.avatarUpdate(avatarUpdate);
  // }

  // @Patch('profile')
  // async updatePassword(@Body('updatePassword') passwordUpdate:PasswordUpdate){
  //   return this.userService.passwordUpdate(passwordUpdate);
  // }

  @Delete('profile')
  async deleteUser(@Body('deleteUser') token:ITokenCheck){
    return this.userService.userDelete(token);
  }
}

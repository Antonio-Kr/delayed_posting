import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('user') user: IUser) {
    console.log('logining user: ', user);
    return this.userService.login(user);
  }

  @Post('register')
  async register(@Body('newUser') user: IUser) {
    console.log('registring user: ', user);
    return this.userService.register(user);
  }

  @Post('forgot')
  async forgotPassword(@Body('email') email: any) {
    console.log('forgot password:', email);
    return this.userService.forgotPassword(email);
  }
}

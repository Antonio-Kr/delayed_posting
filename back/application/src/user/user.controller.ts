import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { stringify } from 'querystring';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('user') user: LoginUserDto) {
    return this.userService.login(user).catch();
  }

  @Post('register')
  async register(@Body('user') user: IUser) {
    return this.userService.register(user);
  }

  @Post('forgot')
  async forgot(@Body('email') email:string){
    return this.userService.forgot(email);
  }

  @Post('confirm')
  async confirm(@Body('email') email:string){
    return this.userService.confirm(email);
  }

  @Get('activate')
  async getActive(@Query() query){
    const {uid:_id, password} = query;
    return this.userService.query(_id, password);
  }

  @Get()
  async getPage(){
    return this.userService.pages();
  }
}

import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('register')
  async register(user: IUser) {
    return this.appService.register(user);
  }

  @MessagePattern('login')
  async login(user: LoginUserDto) {
    return this.appService.login(user);
  }

  @MessagePattern('forgot')
  async forgot(email: string){
    return this.appService.forgot(email);
  }

  @MessagePattern('confirm')
  async confirm(email: string){
    return this.appService.confirm(email);
  }
}

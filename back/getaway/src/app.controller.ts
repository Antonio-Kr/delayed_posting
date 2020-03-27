import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('login')
  async login(user: IUser) {
    return this.appService.login(user);
  }

  @MessagePattern('register')
  async register(user: IUser) {
    return this.appService.register(user);
  }

  @MessagePattern('forgot')
  async forgotPassword(email: any) {
    return this.appService.forgotPassword(email);
  }
}

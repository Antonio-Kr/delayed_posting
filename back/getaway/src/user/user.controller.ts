import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register')
  async register(user: IUser) {
    return this.userService.register(user);
  }

  @MessagePattern('forgotPassword')
  async forgotPassword(email: string) {
    return this.userService.forgotPassword(email);
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { IUserUpdate } from './interfaces/user-update.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register')
  async register(user: IUser) {
    return await this.userService.register(user);
  }

  @MessagePattern('forgotPassword')
  async forgotPassword(email: string) {
    return await this.userService.forgotPassword(email);
  }

  @MessagePattern('userUpdateAll')
  async userUpdate(userUpdate: IUserUpdate) {
    return await this.userService.userUpdate(userUpdate);
  }
}

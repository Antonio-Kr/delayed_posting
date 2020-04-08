import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { IUserUpdate } from './interfaces//user-update.interface';
import { ILinkedInSocialConnection } from './interfaces/social-connection-linkedin.interface';

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

  @MessagePattern('userUpdateAll')
  async userUpdate(userUpdate: IUserUpdate) {
    return this.userService.userUpdate(userUpdate);
  }
}

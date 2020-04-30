import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/users.interface';
import { IUserUpdate } from './interfaces/user-update.interface';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern('register')
  async create(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @MessagePattern('findOneByEmail')
  async findOneByEmail(email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  @MessagePattern('findInfoFromUser')
  async findInfoFromUser(email: string) {
    return await this.usersService.findInfoFromUser(email);
  }

  @MessagePattern('forgotPassword')
  async forgotPassword(email: string) {
    return await this.usersService.forgotPassword(email);
  }

  @MessagePattern('registerOk')
  async registerOk(user: IUser) {
    return await this.usersService.registerOk(user);
  }

  @MessagePattern('userUpdate')
  async userUpdate(userUpdate: IUserUpdate) {
    const { email, firstName, lastName, timezone } = userUpdate;
    let token = {
      token: userUpdate.token,
      email: userUpdate.email,
    };
    return await this.usersService.userUpdate(
      email,
      firstName,
      lastName,
      timezone,
      token,
    );
  }

  @MessagePattern('passwordUpdate')
  async passwordUpdate(passwordUpdate: IUserUpdate) {
    const token = {
      token: passwordUpdate.token,
      email: passwordUpdate.email,
    };
    return this.usersService.passwordUpdate(passwordUpdate, token);
  }

  @MessagePattern('avatarUpdate')
  async avatarUpdate(avatarUpdate: IUserUpdate) {
    const token = {
      token: avatarUpdate.token,
      email: avatarUpdate.email,
    };
    return this.usersService.avatarUpdate(avatarUpdate, token);
  }

  @MessagePattern('avatarDelete')
  async avatarDelete(avatarDelete: IUserUpdate) {
    const token = {
      token: avatarDelete.token,
      email: avatarDelete.email,
    };
    return this.usersService.avatarDelete(avatarDelete, token);
  }

  @MessagePattern('userDeleted')
  async userDelete(email: string) {
    return this.usersService.userDelete(email);
  }

  @MessagePattern('emailToId')
  async emailToId(userId:string){
    return this.usersService.emailToId(userId);
  }
}

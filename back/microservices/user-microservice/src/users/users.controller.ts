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

  @MessagePattern('forgotPassword')
  async forgotPassword(email: string) {
    return await this.usersService.forgotPassword(email);
  }

  @MessagePattern('registerOk')
  async registerOk(user:IUser) {
    return await this.usersService.registerOk(user);
  }

  @MessagePattern('userUpdate')
  async userUpdate(userUpdate:IUserUpdate) {
    let user:IUser = {email:userUpdate.email, 
                      firstName:userUpdate.firstName,
                      lastName:userUpdate.lastName,
                      password:userUpdate.password,
                      timezone:userUpdate.timezone,
                      avatar:userUpdate.avatar,
                      avatarId:userUpdate.avatarId};
    console.log(userUpdate);
    let token = {
      token:userUpdate.token,
      email:userUpdate.email
    };
    console.log(user);
    return await this.usersService.userUpdate(user, token);
  }

  @MessagePattern('passwordUpdate')
  async passwordUpdate(passwordUpdate:IUserUpdate){
    return this.usersService.passwordUpdate(passwordUpdate);
  }

  @MessagePattern('avatarUpdate')
  async avatarUpdate(avatarUpdate:IUserUpdate){
    return this.usersService.avatarUpdate(avatarUpdate);
  }

  @MessagePattern('avatarDelete')
  async avatarDelete(avatarDelete:IUserUpdate){
    return this.usersService.avatarDelete(avatarDelete);
  }
}

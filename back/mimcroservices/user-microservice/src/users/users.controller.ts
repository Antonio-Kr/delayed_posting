import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/users.interface';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('registerUser')
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    await this.usersService.create(createUserDto);
  }
  @MessagePattern('forgotPassword')
  async findByEmail(email: any): Promise<IUser> {
    console.log(email);
    return this.usersService.findByEmail(email);
  }
}

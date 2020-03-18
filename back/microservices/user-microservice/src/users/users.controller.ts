import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

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
}
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModel: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: any): Promise<IUser> {
    console.log(email.string);
    return this.usersModel.findOne({ email: email.string }).exec();
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    let createdUser = new this.userModel(createUserDto);
    console.log(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email): Model<IUser> {
    return await this.userModel.findOne({ email: email });
  }
}

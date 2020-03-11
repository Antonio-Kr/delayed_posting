import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();

    // err => {
    //   if (err) {
    //     for (const key in err.errors) {
    //       if (err.errors.hasOwnProperty(key)) {
    //         console.log(err.errors[key]['properties']);
    //         console.log();
    //         console.log();
    //       }
    //     }
    //   }
    // }
  }

  async findOneByEmail(email): Model<IUser> {
    return await this.userModel.findOne({ email: email });
  }
}

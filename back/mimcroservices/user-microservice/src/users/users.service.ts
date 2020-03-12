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
    return await createdUser.save().catch(result => this.getErrors(result));
  }

  async findOneByEmail(email): Promise<IUser> {
    let x = await this.userModel.findOne({ email: email });
    console.log(email, x);
    return x;
  }

  async forgotPassword(email: string) {
    // todo: reset password
    return await this.userModel.findOne({ email: email });
  }

  private getErrors(result) {
    let errors = [];

    if (result.name == 'MongoError') {
      errors.push({
        type: 'duplicate',
        path: 'email',
      });
    }

    for (const key in result.errors) {
      if (result.errors.hasOwnProperty(key)) {
        const element = result.errors[key]['properties'];

        errors.push({
          type: element.type,
          path: element.path,
        });
      }
    }

    return errors;
  }
}

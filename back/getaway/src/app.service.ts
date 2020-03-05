import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AppService {
  login(user: IUser) {
    return user;
  }
  register(user: IUser) {
    return user;
  }
  forgotPassword(email: string) {
    return email;
  }
}

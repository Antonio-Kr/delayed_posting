import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  public login(user: IUser) {
    return 'logining';
  }

  public register(user: IUser) {
    return 'register';
  }

  public forgotPassword(email: string) {
    return 'forgot password email:' + email;
  }
}

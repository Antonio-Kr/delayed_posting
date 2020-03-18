import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsPasswordValid } from 'src/is-valid-pass.decorator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'email is required ok',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsPasswordValid()
  readonly password: string;
}

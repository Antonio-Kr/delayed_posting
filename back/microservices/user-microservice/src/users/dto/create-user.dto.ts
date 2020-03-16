import {
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { IsPasswordValid } from 'src/is-valid-pass.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPasswordValid()
  readonly password: string;

  @IsNotEmpty()
  @IsDateString()
  readonly timezone: string;

  readonly avatar: string;

  @IsNumberString()
  readonly avatarId: number;
}

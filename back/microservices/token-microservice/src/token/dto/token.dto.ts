import { IsDateString, IsNotEmpty, IsJWT } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsNotEmpty()
  @IsDateString()
  expires: Date;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}

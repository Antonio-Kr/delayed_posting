import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSocialConnectionDto {
  @IsNotEmpty()
  readonly providerId: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  @IsDateString()
  readonly createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly updatedAt: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly expiresAt: Date;
}

import { IsNotEmpty, IsDateString, IsBoolean } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  readonly providerId: string;

  @IsNotEmpty()
  readonly postId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsDateString()
  readonly startsAt: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly notify: string;

  @IsNotEmpty()
  readonly status: string;
}

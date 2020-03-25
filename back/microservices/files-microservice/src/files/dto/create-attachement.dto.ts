import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAttachementDto {
  @IsNotEmpty()
  readonly link: string;

  @IsNotEmpty()
  readonly fileId: string;

  @IsNotEmpty()
  readonly postId: string;

  @IsNotEmpty()
  readonly contentType: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
}
